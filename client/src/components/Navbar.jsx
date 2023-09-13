import { Navigate, useNavigate } from "react-router";
import { box } from "../assets";
import Cookies from "universal-cookie";
import SignIn from "../pages/SignIn";

const Navbar = () => {
  const cookie =new Cookies();
  const token =cookie.get('TOKEN');
  console.log(token);

const logout=async ()=>{
cookie.remove('TOKEN' ,{path:'/'}) ;
window.location.href="/signin"


}



  return (
    <>
      <div className="flex items-center mx-4  justify-between max-xs:justify-center max-xs:gap-8 max-xs:m-0 ">
        <div className="flex gap-1 ">
          <img
            className="h-[2.625rem] w-[2.625rem] max-xs:h-[2.5rem] max-xs:w-[2.5rem] "
            src={box}
            alt=""
          />
          <h1 className="fontBebas text-[2.18rem] text-primary max-[480px]:hidden ">
            Qr Genuis
          </h1>
        </div>

        <div className="flex fontRaj credits  max-xs:text-[0.7rem] ">
          <h3>Available Credits : </h3>
          <p>&nbsp; Unlimited</p>
        </div>

        <div className="text-primary flex items-center fontBebas text-[2.5rem] max-[480px]:text-[1.22rem] max-xs:text-[1.8rem]">
          <div className="v1 mr-7 max-xs:mr-3" />
          <button  type="submit" onClick={()=>logout()}>
            <h1>LOGOUT</h1>
          </button>
        </div>
      </div>

      <hr className="text-primary" />
    </>
  );
};

export default Navbar;
