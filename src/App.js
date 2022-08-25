import React from "react";
import Header from "./header";
import Meme from "./meme";

function App() {
  return (
    <div>
            <Header />
            <Meme />
    </div>
  );
}

export default App; 


/* export default function App() {
    
    /*
     * Challenge: Connect the form to local state
     * 
     * 1. Create a state object to store the 4 values we need to save.
     * 2. Create a single handleChange function that can
     *    manage the state of all the inputs and set it up
     *    correctly
     * 3. When the user clicks "Sign up", check if the 
     *    password & confirmation match each other. If
     *    so, log "Successfully signed up" to the console.
     *    If not, log "passwords to not match" to the console.
     * 4. Also when submitting the form, if the person checked
     *    the "newsletter" checkbox, log "Thanks for signing
     *    up for our newsletter!" to the console.
     
    
    const [FormData, setformData] = React.useState({
        email:"",
        password:"",
        confirmpassword:"",
        okaytoemail:true

    })
    console.log(FormData)
    function handleSubmit(event) {
        event.preventDefault()
    }
    function handlechange(event){
      const {name, value, type, checked} = event.target
      setformData(PrevFormData=>({
          ...PrevFormData,
         [name]: type === "checkbox" ? checked : value
        }))
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    value={FormData.email}
                    onChange={handlechange}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    value={FormData.password}
                    onChange={handlechange}
                />
                <input 
                    type="password" 
                    placeholder="Confirm password"
                    className="form--input"
                    name="confirmpassword"
                    value={FormData.confirmpassword}
                    onChange={handlechange}
                />
                
                <div className="form--marketing">
                    <input
                        id="okayToEmail"
                        type="checkbox"
                        name="okaytoemail"
                        onChange={handlechange}
                        checked={FormData.okaytoemail}
                        
                    />
                    <label htmlFor="okayToEmail">I want to join the newsletter</label>
                </div>
                <button 
                    className="form--submit"
                >
                    Sign up
                </button>
            </form>
        </div>
    )
}*/

