'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPresence } from '@/store/slices/trackUserSlice'
import { Messages, PresenceState } from '@/type'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import InputBox from './InputBox'
import { supabase } from '@/utils/supabase/client'

const ChatScreen = () => {
  const [messages, setMessages] = useState<Messages[]>([])
    const { chatId, userId } = useAppSelector(state => state.chat)
    const profileId = useAppSelector(state => state.profile.id)
    const dispatch = useAppDispatch()
    const presence = useAppSelector(state => state.trackUser.presence)
    const containerRef = useRef<HTMLDivElement>(null)
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

    // 📌 Watch scroll position
    const handleScroll = () => {
        const el = containerRef.current
        if (!el) return
        const threshold = 150 // pixels from bottom to still allow auto-scroll
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
        setShouldAutoScroll(isNearBottom)
    }

    useEffect(() => {
        const el = containerRef.current
        if (el) {
            el.addEventListener('scroll', handleScroll)
            return () => el.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (chatId) {
            supabase.rpc("fetch_msg_with_sts_update", {
                chatid: chatId,
                userid: userId,
                profileid: profileId
            }).then(({ data, error }) => {
                if (!error) setMessages(data as Messages[])
            })

            const channel = supabase
                .channel('chat-' + chatId)
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Message',
                    filter: `chat_id=eq.${chatId}`
                }, (payload : {new : Messages}) => {
                    setMessages(prev => [...prev, payload.new])
                })
                .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
        }
    }, [chatId])

    useEffect(() => {
        if (shouldAutoScroll && containerRef.current) {
            const el = containerRef.current
            el.scrollTop = el.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        if (!chatId || !profileId) return;

        const presenceChannel = supabase.channel('presence:chat-' + chatId, {
            config: { presence: { key: profileId } },
        });

        presenceChannel
            .on('presence', { event: 'sync' }, () => {
                const state = presenceChannel.presenceState() as PresenceState;
                dispatch(setPresence(state));
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await presenceChannel.track({ user_id: profileId });
                }
            });

        return () => {
            supabase.removeChannel(presenceChannel);
        };
    }, [chatId, profileId]);

    return (
        <>
            <div
                ref={containerRef}
                className='flex flex-col !py-8 !px-4 !pb-0 w-full h-full overflow-y-scroll'
            >
                <div className='flex flex-col gap-1.5 w-full h-full'>
                    {messages.map((item) => (
                        <MessageBox data={item} key={item.id} />
                    ))}
                </div>
            </div>
            <InputBox />
        </>
    )
}

export default ChatScreen