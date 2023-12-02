import { ChangeEvent, useEffect, useState } from "react";
import { deleteUser, fetchUsers} from '../../features/users/userSlice';
import Table from "../Table";
import { CellContainer, LineContainerComment, PropertyText } from '../StyledTable';
import { Wrapperdashboardcontainer } from '../StyledComponent';
import { MdDelete } from "react-icons/md";
import { Active, Inactive } from "./StatusButton";
import styled from "styled-components";
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux/index';
import { WrapperButton, FilterButton, WrapperInput, SearchIcon, Input, Select, Option } from '../StyledFilterButtons';
import { ClimbingBoxLoader } from 'react-spinners';
import { colors } from '../theme';
import Swal from "sweetalert2";

export const Users = () => {
  const dispatch = useCustomDispatch()
  const users = useCustomSelector(state => state.users.users);
  const width = useCustomSelector(state => state.visual.width);
  const loadingStatus = useCustomSelector((state) => state.users.status);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({}))
  }, [dispatch])
  
  useEffect(() => {
  if(loadingStatus === 'pending'){
    setIsLoading(true)
  }else{
    setIsLoading(false)
  }
}, [loadingStatus])
  
  const onDeleteUser = (userId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecuta la eliminación
        dispatch(deleteUser(userId))
        // Muestra la alerta de éxito después de eliminar
        Swal.fire({
          title: 'Deleted!',
          text: 'The room has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  const statusHandler = (row: Record<string, any>) => {
    if(row.status === 'Active'){
      return <Active/> 
    }else {
      return <Inactive/>
    }
  }

  const [userName, setuserName] = useState('');
  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setuserName(newValue);
  };
    const searchUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(userName.toLowerCase())
  );

  const [filterNav, setFilterNav] = useState('All');
  const filteredUsers = users.filter((booking) => {
    switch(filterNav){
      case "All":
        return true;
      case "Active":
        return booking.status === "Active"
      case "Not Active":
        return booking.status === "Not Active"
      default:
        return false;
    }
  })

  const [orderBy, setOrderBy] = useState("none");
  const [selected, setSelected] = useState("guest-asc");
  //Ordenar por...
  if (selected === "guest-asc") {
    filteredUsers.sort((a, b) => {
      const nombreA = a.full_name.toUpperCase();
      const nombreB = b.full_name.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
  } else if (selected === "guest-des") {
    filteredUsers.sort((a, b) => {
      const nombreA = a.full_name.toUpperCase();
      const nombreB = b.full_name.toUpperCase();
      if (nombreA > nombreB) {
        return -1;
      }
      if (nombreA < nombreB) {
        return 1;
      }
      return 0;
    });
  }



  const finalFilteredUsers = userName ? searchUsers : filteredUsers;

  const cols = [
    {
      property: 'name',
      label: 'Full Name',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <Image src={row.photo} alt="random image"/>
          <NameText>{row.full_name}</NameText>
          <EmailText>{row.email}</EmailText>
          <IdText>Id: {row._id}</IdText>
        </CellContainer>
      ),
    },
    {
      property: 'startdate',
      label: 'Start Date',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.start_date}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'description',
      label: 'Description',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <PropertyText>{row.description}</PropertyText>
        </CellContainer>
      ),
    },
    {
      property: 'contact',
      label: 'Phone Number',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <Number href={`tel:${row.phone_number}`}>{row.phone_number}</Number>
        </CellContainer>
      ),
    },
    {
      property: 'status',
      label: 'Status',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <LineContainerComment><PropertyText>{statusHandler(row)}</PropertyText></LineContainerComment>
        </CellContainer>
      ),
    },
    {
      property: 'delete',
      label: '',
      display: (row: Record<string, any>) => (
        <CellContainer>
          <DeleteIconContainer ><DeleteIcon onClick={() => onDeleteUser(row._id)}/></DeleteIconContainer>
        </CellContainer>
      ),
    },
]
    return(
      <>
        <Wrapperdashboardcontainer width={width}>
            <WrapperBookingNavContainer>
            <LeftNavContainer>
              <WrapperButton >
                <FilterButton style={{
                  color: filterNav === 'All' ? colors.filterGreenButton : undefined,
                  borderBottom: filterNav === 'All' ? `3px solid ${colors.filterGreenButton}` : undefined,
                  fontWeight: filterNav === 'All' ? 600 : undefined,
                }} 
                onClick={() => setFilterNav('All')}>All Employee</FilterButton>
              </WrapperButton>
              <WrapperButton>
                <FilterButton style={{
                  color: filterNav === 'Active' ? colors.filterGreenButton : undefined,
                  borderBottom: filterNav === 'Active' ? `3px solid ${colors.filterGreenButton}` : undefined,
                  fontWeight: filterNav === 'Active' ? 600 : undefined,
                }} 
                onClick={() => setFilterNav('Active')}>Active Employee</FilterButton>
              </WrapperButton>
              <WrapperButton>
                <FilterButton style={{
                  color: filterNav === 'Not Active' ? colors.filterGreenButton : undefined,
                  borderBottom: filterNav === 'Not Active' ? `3px solid ${colors.filterGreenButton}` : undefined,
                  fontWeight: filterNav === 'Not Active' ? 600 : undefined,
                }} 
                onClick={() => setFilterNav('Not Active')}>Inactive Employee</FilterButton>
              </WrapperButton>
              <WrapperInput>
                <SearchIcon/>
                <Input 
                  placeholder='Search Employee Name'
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </WrapperInput>
            </LeftNavContainer>
            <RightNavContainer>
                <Select 
                value={orderBy} 
                onInput={(event) => {
                  const selectedValue = (event.target as HTMLSelectElement).value;
                  setSelected(selectedValue);
                }}
                >
                    <Option value="none">Sort by</Option>
                    <Option value="guest-asc">Name A-Z</Option>
                    <Option value="guest-des">Name Z-A</Option>
                </Select>
            </RightNavContainer>
          </WrapperBookingNavContainer>
          <Table cols={cols} data={finalFilteredUsers}/>
          {isLoading && (
          <LoaderContainer>
              <ClimbingBoxLoader color="#7884a3" />
          </LoaderContainer>
        )}
        </Wrapperdashboardcontainer>
      </>
    )
}

const DeleteIcon = styled(MdDelete)`
  cursor: pointer;
  color: #bd2929;
  width: 20px;
  height: 20px;
  text-align: center;
`;
const DeleteIconContainer = styled.span`
  text-align: center;
`;
const WrapperBookingNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
    height: 100px;
`;
const LeftNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 85%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  `;
const RightNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 15%;
  align-items: center;
`;

const NameText = styled.span`
  color: black;
  font-weight: 600;
  font-size: 12px;
`;
const IdText = styled.span`
  font-size: 10px;
  text-overflow: ellipsis;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
`;
const EmailText = styled.span`
  color: black;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -1px;
`;
const Number = styled.a`
  text-decoration: none;
`;
const Image = styled.img`
  width: 90px;
  border-radius: 8px;
`;
const LoaderContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: -50%;
    transform: translate(-50%);
`;