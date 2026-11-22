const employerWebsiteByName: Record<string, string> = {
    nextdata: 'https://www.nextdata.com/',
    indebted: 'https://www.indebted.co/en-us/',
    greyshore: 'https://greyshore.com/',
    thoughtworks: 'https://www.thoughtworks.com/',
    softtek: 'https://www.softtek.com/',
    accenture: 'https://www.accenture.com/en/about/company-index',
};

export function getEmployerWebsite(employer: string): string | undefined {
    return employerWebsiteByName[employer.trim().toLowerCase()];
}
