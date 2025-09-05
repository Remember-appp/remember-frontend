'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import Button from '../Button'

export default function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const originalFile = acceptedFiles[0]

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
      initialQuality: 0.7,
    }

    try {
      const compressedFile = await imageCompression(originalFile, options)
      setFile(compressedFile)

      const previewUrl = URL.createObjectURL(compressedFile)
      setPreview(previewUrl)
    } catch (error) {
      console.error('Ошибка сжатия изображения:', error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  })

  const handleCancel = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="flex m-3 flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={` h-20 w-60 text-center border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
          isDragActive ? 'border-emerald-500' : 'border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag & drop an image, or click to select</p>
        )}
      </div>
      {preview && (
        <img
          src={preview}
          width={250}
          height={250}
          alt="Avatar preview"
          className=" rounded object-cover"
        />
      )}
      {file && (
        <p className="text-sm text-gray-600">
          Compressed size: {(file.size / 1024).toFixed(1)} KB
        </p>
      )}
      {preview && <Button text="Cancel" onClick={handleCancel} />}
    </div>
  )
}
