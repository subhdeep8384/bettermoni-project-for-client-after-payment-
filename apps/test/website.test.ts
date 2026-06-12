import { describe, it, expect } from "bun:test";
import axios from "axios";

describe("website gets created", () => {
  it("website not created if url not present", async () => {
    try {
      const data =  await axios.post(`${process.env.BASE_URL}/website`, {});
      console.log(data)

      throw new Error("Request should fail");
    } catch (err: any) {
      expect(err.response.status).toBe(400);

      expect(err.response.data).toEqual({
        message: "url required"
      });
    }
  });

  it("website should create if url is present" , async () =>{
    try{
        const response =  await axios.post(`${process.env.BASE_URL}/website`, {
            url : "www.google.com" ,
            user_id : 1
        });
        expect(response.status).toBe(201) ;
        expect(response.data).toHaveProperty("id")
        expect(response.data).toEqual({
            message : "created"
        }) 
   
    }catch(err){
        console.log(err)
    }
  })
});