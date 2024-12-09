const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function fetchTransactions(month, page, limit) {
  let url = `${serverUrl}/transaction?`;

  if (month) {
    url += `month=${month}&`;
  }

  if (page) {
    url += `page=${page}&`;
  }

  if (limit) {
    url += `per_page=${limit}`;
  }

  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return resData;
}

export async function fetchStatistics(month) {
  let url = `${serverUrl}/transaction/statistics?`;

  if (month) {
    url += `month=${month}`;

    const response = await fetch(url);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    return resData;
  }
}

export async function fetchItemsPerPriceRange(month) {
  let url = `${serverUrl}/transaction/items-count?`;

  if (month) {
    url += `month=${month}`;

    const response = await fetch(url);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch items per price range");
    }

    return resData;
  }
}
