import axios from 'axios';

export const getLiveMatches = async () => {
  try {
    const res = await axios.get('https://v3.football.api-sports.io/leagues?name=premier league', {
      headers: {
        'x-apisports-key': 'ef7c32a4e2d51d1a7243d74b5244a757',
      },
    });
    console.error(res.data);
    return res.data.response;
  } catch (error) {
    console.error('❌ Error fetching live matches:', error.message);
    return [];
  }
};

export const getTodayMatches = async (today) => {
  try {
    const res = await axios.get(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
      headers: {
        'x-apisports-key': 'ef7c32a4e2d51d1a7243d74b5244a757',
      },
    });

    console.error(res.data.response);
    console.log(res.data.response);

    return res.data.response;
  } catch (error) {
    console.error("❌ Error fetching today's matches:", error.message);
    return [];
  }
};

const formatMatchesData = (matches) => {
  return matches.map((match) => ({
    id: match.fixture.id,
    date: match.fixture.date,
    status: match.fixture.status.short, // NS, 1H, 2H, FT...
    league: match.league.name,
    leagueLogo: match.league.logo, // 🏆 لوجو الدوري
    homeTeam: match.teams.home.name,
    awayTeam: match.teams.away.name,
    homeLogo: match.teams.home.logo, // 🏠 صورة الفريق المستضيف
    awayLogo: match.teams.away.logo, // 🚗 صورة الفريق الضيف
    goalsHome: match.goals.home,
    goalsAway: match.goals.away,
  }));
};
