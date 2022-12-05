import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_CURRENT_VIEW: "SET_CURRENT_VIEW",
    LIKING_SONG:"SET_LIKING_SONG",
    SEARCHING:"SET_SEARCHING",
    PUBLISH_PLAYLIST: "PUBLISH_PLAYLIST",
    PLAY_CURRENT_LIST: "PLAY_CURRENT_LIST",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    TYPE_SORT: "TPYE_SORT"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        currentView: "home",
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        listeningList: null,
        searchWord: "",
        typeSort:"",
        guestAccount:false
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: "home",
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                    
                });
            }
            case GlobalStoreActionType.LIKING_SONG: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                    
                });
            }
            case GlobalStoreActionType.SEARCHING: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idPairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: payload.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.PUBLISH_PLAYLIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: store.currentSong,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.PLAY_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idPairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.list.currentSongIndex,
                    currentSong: payload.list.currentSong,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: payload.list,
                    searchWord: store.searchWord,
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.SET_CURRENT_VIEW: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: [],
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    currentView: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: "",
                    typeSort:store.typeSort,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.TYPE_SORT: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idPairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    currentView: store.currentView,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: store.listeningList,
                    searchWord: store.searchWord,
                    typeSort:payload.sortType,
                    guestAccount:store.guestAccount
                });
            }
            case GlobalStoreActionType.setGuest:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: [],
                    currentList: null,
                    currentSongIndex : -1,
                    currentSong : null,
                    newListCounter: 0,
                    currentView: "allList",
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listeningList: null,
                    searchWord: "",
                    typeSort:"",
                    guestAccount:true
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        history.push("/");
        tps.clearAllTransactions();
    }
    // listens: [],
    // published: {
    //     type :[{
    //         isPublished: Boolean,
    //         whenPublished: Date
    //     }], required: true },
    // likesList: [],
    // dislikesList: [],

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        //console.log("USER DETAINS"+ JSON.stringify(auth.user));
        const response = await api.createPlaylist(newListName, auth.user.userName, 
            [], auth.user.email, 0, {isPublished : false, whenPublished: null}, [], [], []);
       // console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
           // history.push("/playlist/" + newList._id);
           store.newListCounter = store.newListCounter + 1
           store.loadIdNamePairs();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.unmarkListForDeletion = function () {
        store.hideModals();
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                //console.log(JSON.stringify(response.data.playlist))
                //(JSON.stringify(store.listeningList))
                if(store.listeningList)
                {
                    if(response.data.playlist._id === store.listeningList._id)
                    {
                        store.listeningList = null
                        history.push('/');
                    }
                }
                
                store.loadIdNamePairs();
                
                // history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.updateView = function (viewString){
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_VIEW,
            payload: viewString
        });
        history.push("/login/");
        history.push("/");
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        tps.clearAllTransactions();
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    

                    //history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;
        
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }


    store.publishPlaylistCard = function (){

        async function updateCurrentListp() {
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            //console.log(JSON.stringify(store.currentList)+ " I AM GOING TO DIE SOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON")
            if (response.data.success) {
                async function updatePublishReducer() {
                    response = await api.getPlaylistPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.PUBLISH_PLAYLIST,
                                payload: pairsArray
                            });
                    }
                }
                updatePublishReducer();
            }
        }

        store.currentList.published = {isPublished:true, whenPublished: new Date().toISOString()}
        updateCurrentListp();
        
    }

    
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            //console.log(JSON.stringify(store.currentList)+ " I AM GOING TO DIE SOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON")
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    store.undo = function () {
        if(store.canUndo())
        {
            tps.undoTransaction();
        }
        
    }
    store.redo = function () {
        if(store.canRedo())
        {
            tps.doTransaction();
        }
       
    }
    store.canRedo = function(){
        return tps.hasTransactionToRedo();
    }
    store.canUndo = function(){
        return tps.hasTransactionToUndo();
    }

    store.addComments = function(){
        
        let commented = document.getElementById("comment-textField").value.trim();
       
        if(commented !== "")
        {
           store.listeningList.comments.push( {comment: commented, user: auth.user.userName} )
        }
        async function asyncupdateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                async function asyncgetListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                            payload: {list:playlist , idPairs:pairsArray}
                        });
                        
                    }
                }
                asyncgetListPairs(playlist);
            }
        }
        asyncupdateList(store.listeningList);
    }

    store.likePlaylist = function(id){
        async function asyncLikeCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist
                let found = playlist.likesList.find(element => element ===  auth.user.email)
                if(found)
                {
                    playlist.likesList = playlist.likesList.filter(element => element !==  auth.user.email) 
                }
                else
                {
                    playlist.likesList.push(auth.user.email);
                }
                
                let disLikeFound = playlist.dislikesList.find(element => element === auth.user.email)
                if(disLikeFound)
                {
                    playlist.dislikesList = playlist.dislikesList.filter(element => element !== auth.user.email)
                }
                
                response = await api.updatePlaylistById(playlist._id, playlist);
                if(store.currentView ==='home')
                        {
                            async function asyncLoadIdNamePairs() {
                                response = await api.getPlaylistPairs();
                                if (response.data.success) {
                                    let pairs = response.data.idNamePairs
                                    if(store.typeSort === "AZ")
                                    {   
                                        pairs = pairs.sort(compareNames())
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="date"){
                                        pairs = pairs.sort(comparePublishDate())
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="listens"){
                                        pairs = pairs.sort(compareListens())
                                        //console.log("doing filter here?")
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="likes"){
                                        pairs = pairs.sort(compareLikes)
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="dislikes"){
                                        pairs = pairs.sort(compareDislikes)
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else{
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                }
                                else {
                                    console.log("API FAILED TO GET THE LIST PAIRS");
                                }
                            }
                            asyncLoadIdNamePairs();
                        }
                        else if(store.currentView === 'users')
                        {
                            store.loadIdPairsSearchUser()
                        }
                        else if(store.currentView === 'allList')
                        {
                            store.loadIdPairsSearch()
                        }
                    }   
            else{
                console.log("errrorr didnt work")
            }
            
        }
        asyncLikeCurrentList(id);
    }

    store.dislikePlaylist = function(id){
        async function asyncdisLikeList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist
                let found = playlist.dislikesList.find(element => element ===  auth.user.email)
                if(found)
                {
                    playlist.dislikesList = playlist.dislikesList.filter(element => element !==  auth.user.email) 
                }
                else
                {
                    playlist.dislikesList.push(auth.user.email);
                }
                let likeFound = playlist.likesList.find(element => element === auth.user.email)
                if(likeFound)
                {
                    playlist.likesList = playlist.likesList.filter(element => element !== auth.user.email)
                }
                
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    
                        if(store.currentView ==='home')
                        {
                            async function asyncLoadIdNamePairs() {
                                response = await api.getPlaylistPairs();
                                if (response.data.success) {
                                    let pairs = response.data.idNamePairs
                                    if(store.typeSort === "AZ")
                                    {   
                                        pairs = pairs.sort(compareNames())
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="date"){
                                        pairs = pairs.sort(comparePublishDate())
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="listens"){
                                        pairs = pairs.sort(compareListens())
                                        //console.log("doing filter here?")
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="likes"){
                                        pairs = pairs.sort(compareLikes)
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else if(store.typeSort ==="dislikes"){
                                        pairs = pairs.sort(compareDislikes)
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                    else{
                                        storeReducer({
                                            type: GlobalStoreActionType.LIKING_SONG,
                                            payload: pairs
                                        });
                                    }
                                }
                                else {
                                    console.log("API FAILED TO GET THE LIST PAIRS");
                                }
                            }
                            asyncLoadIdNamePairs();
                        }
                        else if(store.currentView === 'users')
                        {
                            store.loadIdPairsSearchUser()
                        }
                        else if(store.currentView === 'allList')
                        {
                            store.loadIdPairsSearch()
                        }
                    }   
                
            }
            else{
                console.log("errrorr didnt work")
            }
            
        }
        asyncdisLikeList(id);
    }

    store.playCurrentList = function(id){
        async function asyncPlayCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.listens = (playlist.listens +1)
                async function asyncupdateList(playlistx) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        if(store.currentView ==="home")
                        {
                            async function asyncgetListPairs(playlistx) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                //console.log(JSON.stringify(pairsArray)+"ASHDAJASDASD")
                                //AZ, date, listens, likes, dislikes
                                if(store.typeSort === "AZ")
                                {   
                                    pairsArray = pairsArray.sort(compareNames())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairsArray}
                                    });
                                }
                                else if(store.typeSort ==="date"){
                                    pairsArray = pairsArray.sort(comparePublishDate())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairsArray}
                                    });
                                }
                                else if(store.typeSort ==="listens"){
                                    pairsArray = pairsArray.sort(compareListens())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairsArray}
                                    });
                                }
                                else if(store.typeSort ==="likes"){
                                    pairsArray = pairsArray.sort(compareLikes)
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairsArray}
                                    });
                                }
                                else if(store.typeSort ==="dislikes"){
                                    pairsArray = pairsArray.sort(compareDislikes)
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairsArray}
                                    });
                                }
                                else{
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairsArray}
                                    });
                                }
                                
                            }
                            }
                            asyncgetListPairs(playlistx);
                        }
                        else if(store.currentView === 'users')
                        {
                            async function asyncGetAllPlaylist() {
                                let response = await api.getAllPlaylist();
                                if (response.data.success) {   
                                    let playlists = response.data.data
                                    let pairs = [];
                                    for (let key in playlists) {
                                        let list = playlists[key];
                                        if((list.published.isPublished === true) && list.ownerUsername.includes(store.searchWord) && store.searchWord !=="")
                                        {
                                           // console.log("this is alive")
                                            let pair = {
                                                _id: list._id,
                                                name: list.name,
                                                playlist: list
                                            };
                                            pairs.push(pair);
                                        }
                                    }

                                    if(store.typeSort === "AZ")
                                {   
                                    pairs = pairs.sort(compareNames())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="date"){
                                    pairs = pairs.sort(comparePublishDate())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="listens"){
                                    pairs = pairs.sort(compareListens())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="likes"){
                                    pairs = pairs.sort(compareLikes)
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="dislikes"){
                                    pairs = pairs.sort(compareDislikes)
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else{
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                    
                                }
                            }
                            asyncGetAllPlaylist();
                        }
                        else if(store.currentView === 'allList')
                        {
                            async function asyncGetAllPlaylist() {
                                let response = await api.getAllPlaylist();
                                if (response.data.success) {   
                                    let playlists = response.data.data
                                    let pairs = [];
                                    for (let key in playlists) {
                                        let list = playlists[key];
                                        if((list.published.isPublished === true) && list.name.includes(store.searchWord) && store.searchWord !=="")
                                        {
                                            //console.log("this is alive")
                                            let pair = {
                                                _id: list._id,
                                                name: list.name,
                                                playlist: list
                                            };
                                            pairs.push(pair);
                                        }
                                    }
                                    if(store.typeSort === "AZ")
                                {   
                                    pairs = pairs.sort(compareNames())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="date"){
                                    pairs = pairs.sort(comparePublishDate())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="listens"){
                                    pairs = pairs.sort(compareListens())
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="likes"){
                                    pairs = pairs.sort(compareLikes)
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else if(store.typeSort ==="dislikes"){
                                    pairs = pairs.sort(compareDislikes)
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                else{
                                    storeReducer({
                                        type: GlobalStoreActionType.PLAY_CURRENT_LIST,
                                        payload: {list:playlistx , idPairs:pairs}
                                    });
                                }
                                    
                                }
                            }
                            asyncGetAllPlaylist();
                        }
                    
                        
                        
                    }
                }
                asyncupdateList(playlist);
            }
        }
        asyncPlayCurrentList(id);
    }
    store.loadIdPairsSearch = function(){
        let keyWord = document.getElementById("search-textField").value.trim()
        async function asyncGetAllPlaylist() {
            let response = await api.getAllPlaylist();
            
            if (response.data.success) {   
                let playlists = response.data.data
               
                let pairs = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    if((list.published.isPublished === true) && list.name.includes(keyWord) && keyWord !=="")
                    {
                        let pair = {
                            _id: list._id,
                            name: list.name,
                            playlist: list
                        };
                        pairs.push(pair);
                    }
                }
                if(store.typeSort === "AZ")
                {   
                    pairs = pairs.sort(compareNames())
                    storeReducer({
                        type: GlobalStoreActionType.SEARCHING,
                        payload: {
                            idPairs:pairs,
                            searchWord:keyWord
                        }
                    });
                }
                else if(store.typeSort ==="date"){
                    pairs = pairs.sort(comparePublishDate())
                    storeReducer({
                        type: GlobalStoreActionType.SEARCHING,
                        payload: {
                            idPairs:pairs,
                            searchWord:keyWord
                        }
                    });
                }
                else if(store.typeSort ==="listens"){
                    pairs = pairs.sort(compareListens())
                    storeReducer({
                        type: GlobalStoreActionType.SEARCHING,
                        payload: {
                            idPairs:pairs,
                            searchWord:keyWord
                        }
                    });
                }
                else if(store.typeSort ==="likes"){
                    pairs = pairs.sort(compareLikes)
                    storeReducer({
                        type: GlobalStoreActionType.SEARCHING,
                        payload: {
                            idPairs:pairs,
                            searchWord:keyWord
                        }
                    });
                }
                else if(store.typeSort ==="dislikes"){
                    pairs = pairs.sort(compareDislikes)
                    storeReducer({
                        type: GlobalStoreActionType.SEARCHING,
                        payload: {
                            idPairs:pairs,
                            searchWord:keyWord
                        }
                    });
                }
                else{
                    storeReducer({
                        type: GlobalStoreActionType.SEARCHING,
                        payload: {
                            idPairs:pairs,
                            searchWord:keyWord
                        }
                    });
                }
                
                
                
            }
        }
        asyncGetAllPlaylist();
        
        //get all playists
        // filter then use those namepairs
    }

    store.loadIdPairsSearchUser = function(){
        let keyWord = document.getElementById("search-textField").value.trim()
        async function asyncGetAllPlaylist() {
            let response = await api.getAllPlaylist();
            
            if (response.data.success) {   
                    //console.log("HERE I AM")
                    let playlists = response.data.data
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        //console.log(JSON.stringify(list.ownerUsername)+"vasdawasd")
                        if((list.published.isPublished === true) && list.ownerUsername.includes(keyWord) && keyWord !=="")
                        {
                            let pair = {
                                _id: list._id,
                                name: list.name,
                                playlist: list
                            };
                            pairs.push(pair);
                        }
                    }
                    //console.log(store.typeSort+" ASDASDSAASASDASDASDADASDADSADAASDDAS")
                    if(store.typeSort === "AZ")
                    {   
                        pairs = pairs.sort(compareNames())
                        storeReducer({
                            type: GlobalStoreActionType.SEARCHING,
                            payload: {
                                idPairs:pairs,
                                searchWord:keyWord
                            }
                        });
                    }
                    else if(store.typeSort ==="date"){
                        pairs = pairs.sort(comparePublishDate())
                        storeReducer({
                            type: GlobalStoreActionType.SEARCHING,
                            payload: {
                                idPairs:pairs,
                                searchWord:keyWord
                            }
                        });
                    }
                    else if(store.typeSort ==="listens"){
                        pairs = pairs.sort(compareListens())
                        //console.log("doing filter here?")
                        storeReducer({
                            type: GlobalStoreActionType.SEARCHING,
                            payload: {
                                idPairs:pairs,
                                searchWord:keyWord
                            }
                        });
                    }
                    else if(store.typeSort ==="likes"){
                        pairs = pairs.sort(compareLikes)
                        storeReducer({
                            type: GlobalStoreActionType.SEARCHING,
                            payload: {
                                idPairs:pairs,
                                searchWord:keyWord
                            }
                        });
                    }
                    else if(store.typeSort ==="dislikes"){
                        pairs = pairs.sort(compareDislikes)
                        storeReducer({
                            type: GlobalStoreActionType.SEARCHING,
                            payload: {
                                idPairs:pairs,
                                searchWord:keyWord
                            }
                        });
                    }
                    else{
                        storeReducer({
                            type: GlobalStoreActionType.SEARCHING,
                            payload: {
                                idPairs:pairs,
                                searchWord:keyWord
                            }
                        });
                    }
                    
                    }
            }  
            asyncGetAllPlaylist();
        }

        store.loadIdNamePairsHomeSearch = function(){
            let keyWord = document.getElementById("search-textField").value.trim()
            async function asyncGetAllPlaylist() {
                let response = await api.getAllPlaylist();
                
                if (response.data.success) {   
                        //console.log("HERE I AM")
                        let playlists = response.data.data
                        let pairs = [];
                        for (let key in playlists) {
                            let list = playlists[key];
                            if(list.ownerEmail === auth.user.email && list.name.includes(keyWord) && keyWord !=="")
                            {
                                let pair = {
                                    _id: list._id,
                                    name: list.name,
                                    playlist: list
                                };
                                pairs.push(pair);
                            }
                        }
                        storeReducer({
                                type: GlobalStoreActionType.SEARCHING,
                                payload: {
                                    idPairs:pairs,
                                    searchWord:keyWord
                                }
                            });
                        }
                }  
                asyncGetAllPlaylist();
            }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function (currentPlaylist) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: currentPlaylist
        });
    }


    function compareNames(a,b)
    {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if(nameA < nameB)
        {
            return -1
        }
        if(nameA > nameB)
        {
            return 1
        }
        return 0
    }

    function comparePublishDate(b,a)
    {
        const Adate = new Date(a.playlist.published.whenPublished)
        const Bdate = new Date(b.playlist.published.whenPublished)
        return Adate > Bdate ? 1 : -1 
    }

    function compareListens(b,a)
    {
        const listenA = a.playlist.listens
        const listenB = b.playlist.listens
        return listenA > listenB? 1: -1
    }

    function compareLikes(b,a)
    {
        const likeA = a.playlist.likesList.length
        const likeB = b.playlist.likesList.length
        return likeA > likeB? 1:-1
    }
    function compareDislikes(b,a)
    {
        const dislikeA = a.playlist.dislikesList.length
        const dislikeB = b.playlist.dislikesList.length
        return dislikeA > dislikeB ? 1 : -1
    }

    store.handleSortAZ = function () {
        let pairs = store.idNamePairs

        pairs.sort(compareNames)
        /* Calling the storeReducer function with an object as the argument. */
        storeReducer({
            type: GlobalStoreActionType.TYPE_SORT,
            payload: 
            {
                sortType: "AZ",
                idPairs: pairs
            }
        });
    }

    store.handleSortPublishDate = function () {
        let pairs = store.idNamePairs

        pairs.sort(comparePublishDate)
        
        storeReducer({
            type: GlobalStoreActionType.TYPE_SORT,
            payload: 
            {
                sortType: "date",
                idPairs: pairs
            }
        });
    }

    store.handleSortListens = function () {
        let pairs = store.idNamePairs

        pairs.sort(compareListens)
        //console.log(JSON.stringify(pairs) + "Adawasdasasd")
        storeReducer({
            type: GlobalStoreActionType.TYPE_SORT,
            payload: 
            {
                sortType: "listens",
                idPairs: pairs
            }
        });
    }

    store.handleSortlikes = function () {
        let pairs = store.idNamePairs

        pairs.sort(compareLikes)
        storeReducer({
            type: GlobalStoreActionType.TYPE_SORT,
            payload: 
            {
                sortType: "likes",
                idPairs: pairs
            }
        });
    }

    store.handleSortDislike = function () {
        let pairs = store.idNamePairs

        pairs.sort(compareDislikes)
        storeReducer({
            type: GlobalStoreActionType.TYPE_SORT,
            payload: 
            {
                sortType: "dislikes",
                idPairs: pairs
            }
        });
    }

    store.duplicatePlaylist = function (id) {
        async function asyncDuplicatePlaylist(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                response = await api.createPlaylist(("copy of "+playlist.name), auth.user.userName, 
                playlist.songs, auth.user.email, 0, {isPublished : false, whenPublished: null}, [], [], []);
                if(store.currentView === 'home')
                {
                    store.loadIdNamePairs();
                }
            }
        }
        asyncDuplicatePlaylist(id);
    }

    store.setGuest = function () {
        auth.setGuest()
        storeReducer({
            type: GlobalStoreActionType.setGuest,
            payload: 
            {
            }
        });
       
        
    }



    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };