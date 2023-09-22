const options = [
  {
    days: 30,
    price: 100,
  },
  {
    days: 60,
    price: 200,
  },
  {
    days: 90,
    price: 300,
  },
];

const typeOptions = ['Part Time', 'Full Time', 'Internship'];
const experienceLevelOptions = ['Junior', 'Mid-Level', 'Senior'];
const newListingsInputFields = [
  ['Title', 'title'],
  ['Company Name', 'companyName'],
  ['Location', 'location'],
  ['Application URL', 'url'],
  ['Salary', 'salary'],
];

const typeOptionsWithAny = ['Any', ...typeOptions];
const levelOptionsWithAny = ['Any', ...experienceLevelOptions]

export { typeOptions, options, experienceLevelOptions, newListingsInputFields, typeOptionsWithAny, levelOptionsWithAny };