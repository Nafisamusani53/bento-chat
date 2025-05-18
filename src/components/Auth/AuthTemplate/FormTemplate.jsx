
function FormTemplate({children}) {
  return (
    <div className='rounded-[20px] !p-11 flex flex-col z-10 justify-center items-center gap-3 template-bg relative w-[436px]'>
       <div className='w-28 rounded-2xl bg-white opacity-50 -z-10 top-9 right-7 absolute rotate-45 aspect-square'></div>
       <div className='w-28 rounded-2xl bg-white opacity-50 -z-10 bottom-5 left-4 absolute rotate-12 aspect-square'></div>
        {children}
    </div>
  )
}

export default FormTemplate