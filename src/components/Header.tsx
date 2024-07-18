import { useState } from 'react'

export default function Header() {
  const [nickname, _setNickname] = useState('nick.name')

  return (
    <header className="flex justify-between items-center w-full h-[10%] bg-[#f1f1f2] py-4 px-12">
      <div className="tracking-[.3em] text-[40px] inter-font">Opti</div>
      <div className="flex justify-between items-center min-w-[12%]">
        <div className="text-xl font-inter">{nickname}</div>
        <img src="/Avatar.svg" alt="" className="h-16" />
      </div>
    </header>
  )
}
