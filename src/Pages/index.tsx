import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Profile } from "../Components/Profile";
import { TabHeader } from "../Components/TabHeader";
import { AuthenticatedTemplate } from "@azure/msal-react";

export const HomePage = () => {
  const [arr,setArr]=useState(["Engagements","Reports","System"])
  const [arr1,setArr1]= useState(["1234","Deloitte","Financial","In Progress"," 10-10-2023"," 30-10-2023"])
  
  return (
    <div>
      <Header />
      {/* Your content goes here */}
      <AuthenticatedTemplate>
      <section className="m-20 flex flex-col gap-4">
      <Profile content="Team BootCamp"/>
      <TabHeader tabArray={arr} />      
      {/* WE HAVE TO MOVE THIS INSIDE TABHEADER AND CALL FROM TAB HEADER USING ROUTER  */}
      </section>     
      </AuthenticatedTemplate>
      <Footer />
    </div>
  );
};
