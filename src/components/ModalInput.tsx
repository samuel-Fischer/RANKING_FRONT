import React from 'react'

interface ModalInputProps {
  value: string;
  onClick: () => void;
  selecionado: boolean;
}

export default function ModalInput({value, onClick, selecionado}: ModalInputProps) {
  return (
    <input type="button" className={`w-full text-white text-center cursor-pointer p-1 rounded-md ${selecionado ? "bg-red-500" : "bg-blue-700"}`}  value={value} onClick={onClick} />
  )
}
