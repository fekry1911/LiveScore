// handleApis.js
import axios from 'axios';
const API_KEY_2 = '751bdcb2f2da4e0ad1b4514f4f7df3f9db8072e9f8334eb6ec719f2aed81ec5e';
const BASE_URL_2 = 'https://apiv2.allsportsapi.com/football';

const API_KEY = 'e315c1986d4c7d1f7d3f86c950ca9909';
const BASE_URL = 'https://v3.football.api-sports.io';

//https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=751bdcb2f2da4e0ad1b4514f4f7df3f9db8072e9f8334eb6ec719f2aed81ec5e&from=2025-10-21&to=2025-10-21
const headers = {
  'x-apisports-key': API_KEY,
};
export const getAllMatches2 = async (today) => {
  try {
    const res = await axios.get(
      `${BASE_URL_2}/?met=Fixtures&APIkey=${API_KEY_2}&from=${today}&to=${today}`
    );
    return res.data.result;
  } catch (error) {
    console.error('Error fetching match by ID:', error.message);
    return error.message;
  }
};
export const getMatchById = async (fixtureId) => {
  try {
    const res = await axios.get(`${BASE_URL}/fixtures?id=${fixtureId}`, { headers });
    return res.data.response[0];
  } catch (error) {
    console.error('Error fetching match by ID:', error.message);
    return error.message;
  }
};

export const getLeagueById = async (leagueId, season) => {
  try {
    const res = await axios.get(`${BASE_URL}/leagues?id=${leagueId}&season=${season}`, { headers });
    return res.data.response[0];
  } catch (error) {
    console.error('Error fetching league by ID:', error.message);
    return error.message;
  }
};

export const getTeamById = async (teamId) => {
  try {
    const res = await axios.get(`${BASE_URL}/teams?id=${teamId}`, { headers });
    return res.data.response[0];
  } catch (error) {
    console.error('Error fetching team by ID:', error.message);
    return error.message;
  }
};

export const getMatchesByLeague = async (leagueId, season) => {
  try {
    const res = await axios.get(`${BASE_URL}/fixtures?league=${leagueId}&season=${season}`, {
      headers,
    });
    return res.data.response;
  } catch (error) {
    console.error('Error fetching matches by league:', error.message);
    return [];
  }
};

export const getMatchesByTeam = async (teamId, season) => {
  try {
    const res = await axios.get(`${BASE_URL}/fixtures?team=${teamId}&season=${season}`, {
      headers,
    });
    return res.data.response;
  } catch (error) {
    console.error('Error fetching matches by team:', error.message);
    return [];
  }
};

export const getTodayMatches = async (date) => {
  try {
    const res = await axios.get(`${BASE_URL}/fixtures?date=${date}`, { headers });
    return res.data.response;
  } catch (error) {
    console.error("Error fetching today's matches:", error.message);
    return [];
  }
};
