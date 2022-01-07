const UserFetch = async() => {
           
        // Api Call
    const response = await fetch(`http://localhost:5000/api/auth/getuser`,{ 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    });
      
    const json =  await response.json();
    console.log(json);

    if(json.success){

        //add the name to local storage
        localStorage.setItem('name', json.user.name);
    }
    else{
        console.log("No user exists");
    }
            
}
    
  

export default UserFetch
