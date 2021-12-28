import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    //ставим общий заголовок запроса для всех запросов
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk("auth/register", async (credentials) => {
  try {
    //credentials - это имя переменной, в случае регистрации там будет name, imail, password - то что получаем при сабмите формы
    //axios уже автоматически json-стрингифаит - мы напрямую кидаем обьект, а он его приведет к строке
    //чтоб зарегестрировать пользователя - нужно только сделать post-заброс на бекенд, и все
    const { data } = await axios.post("/users/signup", credentials);
    //после того как мы успешно зарегестрировали пользователя (и пришел на него соотв. токен)
    //мы сетим этот токен на хедеры аксиоса для следующих запросов
    token.set(data.token);
    return data; //результат ответа
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const logIn = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const { data } = await axios.post("/users/login", credentials);
    //после того как мы успешно залогинили пользователя (и пришел на него соотв. токен)
    //мы сетим этот токен на хедеры аксиоса для следующих запросов
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/users/logout");
    token.unset();
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

/*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
//Работа над текущим пользователем - в тетради и вебиннар 1:25:50
const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    console.log("persistedToken", persistedToken);

    if (persistedToken === null) {
      console.log("Токена нет, уходим из fetchCurrentUser");
      return thunkAPI.rejectWithValue();
      //return state; //или так
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      console.log("Data:", data);
      return data;
    } catch (error) {
      // TODO: Добавить обработку ошибки error.message
      throw error;
    }
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
