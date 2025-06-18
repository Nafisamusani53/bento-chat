import { useState } from 'react'

export const FilePreview = ({ url }) => {
  const [open, setOpen] = useState(false)
  const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/i)
  const isVideo = url.match(/\.(mp4|webm)$/i)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="max-w-[200px] max-h-[200px] overflow-hidden rounded-lg cursor-pointer border border-gray-300"
      >
        {isImage && <img src={url} alt="preview" className="w-full h-full object-cover" />}
        {isVideo && (
          <video src={url} className="w-full h-full object-cover" muted playsInline />
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="max-w-full max-h-full p-4">
            {isImage && <img src={url} alt="full-view" className="max-w-full max-h-[90vh] rounded-xl" />}
            {isVideo && (
              <video
                src={url}
                className="max-w-full max-h-[90vh] rounded-xl"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
