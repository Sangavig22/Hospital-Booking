
import  Background from './assets/Background.jpg'

function Home(){

    return(
      <div>
       
           {/* Main Section */}
      <main className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-12 py-12">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-[#1e293b] mb-6 leading-tight">
            Smart Healthcare<br />Appointments
          </h1>
          <p className="text-xl text-[#334155] mb-8">
            Book doctor appointments instantly<br />
            with real-time availability across Sri Lanka
          </p>
          <div className="flex space-x-6">
            <button className="px-6 py-3 border-3 border-[#239F97] rounded-lg font-semibold text-[#1e293b] hover:bg-[#e0f2fe]">
              Book Your appointment
            </button>
            <button className="px-6 py-3 border-3 border-[#239F97] rounded-lg font-semibold text-[#1e293b] hover:bg-[#e0f2fe]">
              Emergency 1990
            </button>
          </div>
        </div>
        {/* Right Image */}
        <div className="flex-1 flex justify-center mt-12 md:mt-0">
          <img
            src={Background}
            alt="Doctors"
            className="rounded-[50px] w-[760px] h-[380px] object-cover shadow-lg"
          />
        </div>
      </main>
      </div>
    )
}
export default Home;