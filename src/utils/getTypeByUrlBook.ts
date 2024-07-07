const getTypeByUrlBook = (url: string) => {
    if(url.includes("https://nettruyen")) {
        return "nettruyen"
    }
    else if(url.includes("https://manhuavn")) {
        return "manhuavn"
    }
    else if(url.includes("https://truyenqq")) {
        return "truyenqq"
    }

    return null;
}

export default getTypeByUrlBook;