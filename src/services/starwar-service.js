import { configVariable } from '../lib/config';

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
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  };
  return fetch(configVariable.moviesBaseUrl, requestOptions).then(handleResponse);
}

function searchMovies(searchStr) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  };
  return fetch(`${configVariable.moviesBaseUrl}/?search=${searchStr}`, requestOptions).then(handleResponse);
}

function searchPeople(searchStr) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  };
  return fetch(`${configVariable.searchPeople}/?search=${searchStr}`, requestOptions).then(handleResponse);
}

function getPeoples() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  };
  return fetch(configVariable.peopleBaseUrl, requestOptions).then(handleResponse);
}

function getPeopleDetail(peopleUrl) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  };
  return fetch(peopleUrl, requestOptions).then(handleResponse);
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