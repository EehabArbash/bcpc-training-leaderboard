import axios from "axios";

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
export const getSubmissions = async function (handles) {
  let results = {};
  for (let index = 0; index < handles.length; index++) {
    await delay();
    const res = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handles[index]}&from=1&count=5000`
    );
    results[handles[index]] = ([ ...res.data.result ]);
  }
  return results;
};

export const getAccountsData = async (handles = []) => {
  const query = handles.join(";");
  let accountsRes = await axios.get(
    `https://codeforces.com/api/user.info?handles=${query}`
  );
  const accounts = accountsRes.data.result
  
  const submissions = await getSubmissions(handles);
  
  return accounts.map((account) => ({
      ...account,
      submissionCount: submissions[account.handle].length,
      okCount: submissions[account.handle].reduce((curr, next) => {
        return curr + (next.verdict === "OK");
      }, 0),
    }))
    .sort((a, b) => {
      return a.okCount < b.okCount ? 1 : -1;
    });
};
