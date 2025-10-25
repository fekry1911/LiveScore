import axios from 'axios';
const API_KEY_2 = '751bdcb2f2da4e0ad1b4514f4f7df3f9db8072e9f8334eb6ec719f2aed81ec5e';
const BASE_URL_2 = 'https://apiv2.allsportsapi.com/football';

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

export const getAllMatchesOfLeaguea = async (leagueId, date) => {
  try {
    const res = await axios.get(
      `${BASE_URL_2}/?met=Fixtures&leagueId=${leagueId}&APIkey=${API_KEY_2}&from=${date}&to=${date}`
    );

    const data = res.data;

    if (!data || !data.result) {
      console.log('No matches found for this day.');
      return [];
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching matches by league:', error.message);
    throw new Error(error.message);
  }
};

export const getTeamsOfLeague = async (leagueId) => {
  try {
    const res = await axios.get(
      `${BASE_URL_2}/?met=Standings&leagueId=${leagueId}&APIkey=${API_KEY_2}`
    );

    const data = res.data;

    if (!data || !data.result) {
      return [];
    }

    return data.result.total;
  } catch (error) {
    console.error('Error fetching matches by league:', error.message);
    throw new Error(error.message);
  }
};
export const getPlayersOfTeam = async (TeamId) => {
  try {
    const res = await axios.get(`${BASE_URL_2}/?met=Teams&teamId=${TeamId}&APIkey=${API_KEY_2}`);

    const data = res.data;

    if (!data || !data.result) {
      return [];
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching matches by league:', error.message);
    throw new Error(error.message);
  }
};
export const getPlayersDetails = async (PlayerId) => {
  try {
    const res = await axios.get(
      `${BASE_URL_2}/?met=Players&playerId=${PlayerId}&APIkey=${API_KEY_2}`
    );

    const players = res.data?.result || [];

    if (players.length === 0) return null;

    const validPlayer = players.find((p) => p.player_match_played && p.player_match_played !== '');

    return validPlayer || players[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTopScoreesOfLeaguea = async (leagueId) => {
  try {
    const res = await axios.get(
      `${BASE_URL_2}/?met=Topscorers&leagueId=${leagueId}&APIkey=${API_KEY_2}`
    );

    const data = res.data;

    if (!data || !data.result) {
      return [];
    }

    return data.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllLeagues = async (today) => {
  try {
    const res = await axios.get(`${BASE_URL_2}/?met=Leagues&APIkey=${API_KEY_2}`);
    return res.data.result;
  } catch (error) {
    return error.message;
  }
};
