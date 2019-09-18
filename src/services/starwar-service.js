import { configVariable, headerData } from '../lib/config';

export const starwarService = {
  getMovies,
  getPeoples,
  searchPeople,
  searchMovies,
  getPeopleDetail
};


function getMovies() {
  const requestOptions = {
    method: 'GET',
    headers: headerData
  };
  return fetch(configVariable.moviesBaseUrl, requestOptions, {mode: 'no-cors'}).then(handleResponse);
}

function searchMovies(searchStr) {
  const requestOptions = {
    method: 'GET',
    headers: headerData
  };
  return fetch(`${configVariable.moviesBaseUrl}/?search=${searchStr}`, requestOptions, {mode: 'no-cors'}).then(handleResponse);
}

function searchPeople(searchStr) {
  const requestOptions = {
    method: 'GET',
    headers: headerData
  };
  return fetch(`${configVariable.searchPeople}/?search=${searchStr}`, requestOptions, {mode: 'no-cors'}).then(handleResponse);
}

function getPeoples() {
  const requestOptions = {
    method: 'GET',
    headers: headerData
  };
  return fetch(configVariable.peopleBaseUrl, requestOptions, {mode: 'no-cors'}).then(handleResponse);
}

function getPeopleDetail(peopleUrl) {
  const requestOptions = {
    method: 'GET',
    headers: headerData
  };
  return fetch(peopleUrl, requestOptions, {mode: 'no-cors'}).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
          window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}