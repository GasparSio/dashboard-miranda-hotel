import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../../util/fetchData';


export interface RoomsType {
    photo: string,
    roomNumber: number,
    _id?: string,
    bedType: string,
    facilities: string,
    price: number,
    offerprice: number,
    status: string,
}

export const fetchAllRooms = createAsyncThunk<RoomsType[], void>(
  'rooms/fetchRooms',
  async () => fetchData({ endpoint: 'rooms', method: 'GET' })
);
export const fetchOneRoom = createAsyncThunk<RoomsType, string>(
  'rooms/fetchRoom',
  async (id: string) => fetchData({ endpoint: `rooms/${id}`, method: 'GET', id })
);
export const deleteOneRoom = createAsyncThunk<string, string>(
  'rooms/deleteOneRoom',
  async (id: string) => {
    await fetchData({ endpoint: `rooms/${id}`, method: 'DELETE'});
    return id; // Retornamos el id para utilizarlo en el reducer
  }
);


//FUNCIONAN PERO SE REPITE CODIGO
//Async functions

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

interface RoomsState {
    rooms: RoomsType[],
    room: RoomsType | null,
    status: string,
}
const initialState: RoomsState = {
    rooms: [],
    room: {} as RoomsType,
    status: 'idle',
}

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRooms.pending, (state) => {
            state.status = 'pending';
          });
          builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.status = 'fulfilled';
            console.log('action payload', action.payload);
            
          });
          builder.addCase(fetchAllRooms.rejected, (state, action) => {
            state.status = 'rejected';
          });
          builder.addCase(fetchOneRoom.pending, (state) => {
            state.status = 'loading';
          });
          builder.addCase(fetchOneRoom.fulfilled, (state, action: PayloadAction<RoomsType>) => {
            state.room = action.payload;
            state.status = 'success';
          });
          builder.addCase(fetchOneRoom.rejected, (state, action) => {
            state.status = 'failed';
          });
          builder.addCase(deleteOneRoom.pending, (state) => {
            state.status = 'loading';
          });
          builder.addCase(deleteOneRoom.fulfilled, (state, action) => {
              state.status = 'success';
              state.rooms = state.rooms.filter(room => room._id !== action.payload);
          });
          builder.addCase(deleteOneRoom.rejected, (state, action) => {
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
    }
})

export default roomSlice.reducer;