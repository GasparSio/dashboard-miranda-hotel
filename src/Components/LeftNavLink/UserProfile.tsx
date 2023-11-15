import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Login-Logout/auth";
import Swal from "sweetalert2";


export const UserProfile: React.FC = () => {
    const { authState } = useAuth();
    
    const [name, setName] = useState(localStorage.getItem('name') || authState.username);
    const [email, setEmail] = useState(localStorage.getItem('email') || authState.email);
    const [image, setImage] = useState(localStorage.getItem('image') || authState.image);

    useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('image', image);
    }, [name, email, image]);

    const onHandleClickPhoto = async () => {
        Swal.fire({
            title: "Submit your Github username",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Look up",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
              try {
                const githubUrl = `
                  https://api.github.com/users/${login}
                `;
                const response = await fetch(githubUrl);
                if (!response.ok) {
                  return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
                }
                return response.json();
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
            });
            localStorage.setItem('image', result.value.avatar_url)
            setImage(result.value.avatar_url)
        }
        
        });
    }

    const onHandleClick = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Edit User Profile',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Username" value="${name}">
          <input id="swal-input2" class="swal2-input" placeholder="Email" value="${email}">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            (document.getElementById('swal-input1') as HTMLInputElement).value,
            (document.getElementById('swal-input2') as HTMLInputElement).value,
          ];
        },
      });
  
      if (formValues) {
        const [newName, newEmail, newImage] = formValues;
        setName(newName);
        setEmail(newEmail);
      }
    };
  
    return (
      <Wrapperprofile>
        <Wrapperimage>
          <Image src={image} alt="User image"/>
        </Wrapperimage>
        <Wrapperspan>
          <Name>{authState.username}</Name>
          <Email>{email}</Email>
        </Wrapperspan>
        <Wrapperbutton>
          <Button onClick={onHandleClick}>Edit Profile</Button>
          <Button onClick={onHandleClickPhoto}>Edit Photo</Button>
        </Wrapperbutton>
      </Wrapperprofile>
    );
  };

const Wrapperprofile = styled.section`
    position: relative;
    width: 70%;
    margin: auto;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 30px 30px #00000036;
    border-radius: 18px;
    height: 170px;
`;
const Wrapperimage = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: -40px;
`;
const Image = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 8px;
`;
const Wrapperspan = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 56px;
`;
const Name = styled.span`
    font-family: Poppins;
    font-weight: 400;
    font-size: 16px;
    color: #393939;
`;
const Email = styled.span`
    font-family: Poppins;
    font-weight: 300;
    font-size: 12px;
    color: #B2B2B2;
`;
const Wrapperbutton = styled.div`
    margin-top: 10px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 54px;
`;
const Button = styled.button`
    height: 25px;
    background-color: #EBF1EF;
    border-radius: 6px;
    color: #135846;
    font-size: 12px;
    font-family: Poppins;
    font-weight: 400;
    text-align: center;
    border: none;
    width: 80%;
`;
