import ReactDOM from 'react-dom'
import { CloseBigIcon } from '../icons'
import useClickOutside from '../../hooks/clickOutside'
import { useRef, useState } from 'react'

function Modal({ children , setClose}) {
  const [animateOut, setAnimateOut] = useState(false)
  const modalRef = useRef(null)
  function handleClose() {
    setAnimateOut(true)
    setTimeout(() => setClose(), 300) // match --animate-modal-out duration
  }

  useClickOutside(modalRef, handleClose)
  return ReactDOM.createPortal(
    <div className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 animate-modal-in ${animateOut ? 'animate-modal-out' : 'animate-modal-in'}`} >
      <div className={`bg-white flex flex-col gap-8 !p-10 border border-faint-grey/50 rounded-2xl relative w-2xl items-center justify-center `} ref={modalRef}>
      <div className='absolute top-1 right-5 w-6 h-6 cursor-pointer' onClick={handleClose} >
        <CloseBigIcon/>
      </div>
      {typeof children === 'function' ? children(handleClose) : children}
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal



