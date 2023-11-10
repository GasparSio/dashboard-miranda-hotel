import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roomsData } from './rooms-data';


const rooms: RoomsType[] = roomsData;

export interface RoomsType {
    photo: string,
    roomNumber: number,
    id: number,
    bedType: string,
    facilities: string,
    price: string,
    offerprice: string,
    status: string,
}

//Function to delay the loading data
const delay = (data: RoomsType[] | RoomsType, time: number = 200) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(data)
        }, time)
    })
}

//Async functions
export const fetchRooms = createAsyncThunk<RoomsType[], void>(
    'rooms/fetchRooms',
    async (): Promise<RoomsType[]> => {
        return await delay(rooms) as RoomsType[];
    } 
);
export const fetchRoom = createAsyncThunk<RoomsType, number>(
    'rooms/fetchRoom',
    async (roomId: number): Promise<RoomsType> => {
        const roomById: RoomsType | undefined = rooms.find((room) => room.id === roomId)
        
        if (roomById !== undefined) {
            return await delay(roomById) as RoomsType;
        } else {
            throw new Error('No se encontró la reserva con el ID proporcionado');
        }

    } 
);

// export const createRoom = createAsyncThunk(
//     'rooms/createRoom',
//     async (newRoom) => {
//         const createdRoom = await delay(newRoom)
//         return createdRoom;
//     } 
// );
// export const updateRoom = createAsyncThunk(
//     'rooms/updateRoom',
//     async (roomId, updatedRoom) => {
//         const updated = await delay(updateRoom)
//         return updated;
//     } 
// );
export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async (roomId: number) => {
        await delay(rooms);
        return roomId; // Devuelve el ID de la habitación a eliminar
    } 
);

interface RoomsState {
    rooms: RoomsType[],
    room: RoomsType | null,
    status: string,
    isloading: boolean,
    haserror: boolean,
}
const initialState: RoomsState = {
    rooms: [],
    room: null,
    status: 'idle',
    isloading: false,
    haserror: false,
}

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          });
          builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.status = 'success';
          });
          builder.addCase(fetchRooms.rejected, (state, action) => {
            state.isloading = false;
            state.haserror = true;
            state.status = 'failed';
          });
        //   builder.addCase(createRoom.pending, (state) => {
        //     state.status = 'loading';
        //     state.isloading = true;
        //   });
        //   builder.addCase(createRoom.fulfilled, (state, { payload }) => {
        //     state.room.push(payload);
        //     state.status = 'success';
        //   });
        //   builder.addCase(createRoom.rejected, (state, action) => {
        //     state.haserror = true;
        //     state.status = 'failed';
        //   });
        builder.addCase(fetchRoom.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          });
          builder.addCase(fetchRoom.fulfilled, (state, action: PayloadAction<RoomsType>) => {
            state.room = action.payload;
            state.status = 'success';
          });
          builder.addCase(fetchRoom.rejected, (state, action) => {
            state.haserror = true;
            state.status = 'failed';
          });
        //   builder.addCase(updateRoom.pending, (state) => {
        //     state.status = 'loading';
        //     state.isloading = true;
        //   });
        //   builder.addCase(updateRoom.fulfilled, (state, action) => {
        //     const index = state.rooms.findIndex(room => room.id === action.payload.id);
        //     if (index !== -1) {
        //         state.rooms[index] = action.payload;
        //     }
        //     state.status = 'success'
        //     state.isloading = false
        //   });
        //   builder.addCase(updateRoom.rejected, (state, action) => {
        //     state.haserror = true;
        //     state.status = 'failed';
        //   });
        builder.addCase(deleteRoom.pending, (state) => {
            state.status = 'loading';
            state.isloading = true;
          });
          builder.addCase(deleteRoom.fulfilled, (state, action) => {
            state.status = 'success';
            state.isloading = false;
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
          });
          builder.addCase(deleteRoom.rejected, (state, action) => {
            state.haserror = true;
            state.status = 'failed';
          });
    }
})

export default roomSlice.reducer;