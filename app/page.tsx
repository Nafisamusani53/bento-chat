
import Action from "@/components/Panels/ActionPanel/Action";
import Chat from "@/components/Panels/ChatPanel/Chat";
import Navigation from "@/components/Panels/NavigationPanel/Navigation";


export default async function Home() {

  //when refreshed if profile is there in local storage then save it in profile slice
  return (
    <div className='chat-bg flex justify-center items-center !px-[170px] !py-8 w-full h-[100vh] max-xl:!px-[70px] max-lg:!px-[40px]'>
      <div className='w-full h-full flex gap-1.5 items-center justify-center'>
      <Navigation/>
      <Action/>
      <Chat/>
      </div>
    </div>
  );
}

