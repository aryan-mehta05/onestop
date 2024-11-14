import { FaEarthAmericas } from "react-icons/fa6";

export default function LandingPage() {
    return(

        <div id="wd-slogan">

<button id="wd-signin"
   onClick={() => alert("Signin")}
   className="d-flex align-items-center flex-grow-1 text-decoration-none float-end"
      type="button">
 Signin
</button>



<button id="wd-sign"
    className="d-flex align-items-center flex-grow-1 text-decoration-none float-end"
   onClick={() => alert("Signup")}
      type="button">
 Signup
</button>
<br/><br/><br/><br/>



<div id="wd-slogan"
className="d-flex align-items-center flex-grow-1 text-decoration-none">
<h1> HEY! Share Your Trips
& Get Tips</h1>
</div>

    <div className="w-full max-w-md">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
        <input
          type="text"
          placeholder="Where to?"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-200 px-3 py-1 rounded-full">Beach Towns</button>
          <button className="bg-purple-200 px-3 py-1 rounded-full">Festivals</button>
          <button className="bg-yellow-200 px-3 py-1 rounded-full">Cultural Immersions</button>
        </div>
      </div>
    </div>
    <hr/><br/><br/>


    <div id="wd-users"
className="text-4xl font-bold text-center mb-6">
   <h1>A World full of adventures awaits for you <FaEarthAmericas /> </h1>
    <button className="bg-yellow-200 px-3 py-1 rounded-full text-center">Get Inspired</button>
</div>
<br/><br/>

<div id="wd-moments"
className="text-2xl font-bold mb-6">
   <h1> Moments by John </h1>

<button id="wd-signin"
   onClick={() => alert("Signin")}
   className="d-flex align-items-center flex-grow-1 text-decoration-none "
      type="button">
 Add
</button>
</div>




      </div>);}