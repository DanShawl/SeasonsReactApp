import './SeasonDisplay.css';
import React from 'react';

const seasonConfig = {
  summer: {
    text: 'Lets hit the beach',
    iconName: 'sun',
  },
  winter: {
    text: 'Burr, its cold',
    iconName: 'snowflake',
  },
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
    // In this above expression
    //    the "lat > 0" will be evaluated
    //    if it returns true, we will return summer
    //    if not, we will return 'winter'
    //    if(lat>0) {return "summer"} else {return "winter"}
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.lat, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];
  //  season = the result of the getSeason function (summer or winter)
  //  so, seasonConfig[season] will return { text, iconName }
  //  then, we destructure that result to store the two values

  return (
    //  try to keep the returned root div className similar to the comp
    <div className={`season-display ${season}`}>
      <i className={`${iconName} icon-left icon massive`} />
      <h1>{text}</h1>
      <i className={`${iconName} icon-right icon massive`} />

      {/* {season === 'winter' ? 'Burr, it is chilly' : 'Lets hit the beach'} */}
    </div>
  );
};

// const text =
//     season === 'winter' ? 'Burr, it is chilly' : 'Lets hit the beach';
//   //  We can use a helper variable for this or put it directly in the jsx

//   const icon = season === 'winter' ? 'snowflake' : 'sun';
//   //  We can change the icon by changing its name in semantic ui

export default SeasonDisplay;
