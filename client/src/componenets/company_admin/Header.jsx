import React from 'react'

function Header({message}) {
  return (
         <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white shadow-md">
        <div className="mb-4 md:mb-0 font-bold text-2xl ">
          {message}
        </div>
       <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
      <img
        src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <div className="font-semibold">John Director</div>
      <div className="text-sm text-gray-500">Production Manager</div>
    </div>
  </div>
</div>

      </header>
  )
}

export default Header