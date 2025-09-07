'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import Button from '../Button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export default function AvatarUpload() {
  const { data: session } = useSession()

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
      console.error('Error converting image', error)
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

  const handleSave = async () => {
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('meta', JSON.stringify({ alt: 'avatar' }))

        const resUpload = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/assets/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
          }
        )
        toast.success('Avatar updated')
      } catch (error) {
        toast.error('Error saving avatar')
        return
      }
    } else {
      toast.warning('There is no file selected')
      return
    }
  }

  return (
    <div className="flex m-3 flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={` h-20 w-70 text-center border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
          isDragActive ? 'border-emerald-500' : 'border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p> Click to select or drag & drop an image</p>
        )}
      </div>
      {preview && (
        <div className=" flex flex-col gap-2 items-center rounded">
          <h3 className="font-black text-xl">Preview</h3>
          <img
            src={preview}
            width={250}
            height={250}
            alt="Avatar preview"
            className=" rounded object-cover"
          />
          {file && (
            <p className="text-sm text-gray-600">
              Compressed size: {(file.size / 1024).toFixed(1)} KB
            </p>
          )}

          <div className="flex w-full justify-between">
            <Button
              text="Cancel"
              onClick={handleCancel}
              className="bg-stone-200 m-2 rounded-full"
            />
            <Button
              text="Save"
              onClick={handleSave}
              className="bg-emerald-300 m-2 rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
