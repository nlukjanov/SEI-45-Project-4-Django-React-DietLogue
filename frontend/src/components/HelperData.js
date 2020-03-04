import React from 'react'
const pluralize = require('pluralize')

const HelperData = ({ helperData, formData }) => {
  return (
    <div>
      <div className='helper-container'>
        <small className='help helper-data'>
          {`${formData.portion} ${pluralize('portion', formData.portion)}`}
        </small>
        <small className='help helper-data'>
          {`${Number(helperData.measure) * formData.portion} ${pluralize(
            helperData.unit,
            Number(helperData.measure) * formData.portion
          )}`}
        </small>
        <small className='help helper-data'>
          {`${Number(helperData.grams) * formData.portion} grams`}
        </small>
      </div>
      <div className='helper-container'>
        <small className='help helper-data'>
          {`${Number(helperData.calories) * formData.portion} calories`}
        </small>
        <small className='help helper-data'>
          {`${Number(helperData.protein) * formData.portion}g protein`}
        </small>
        <small className='help helper-data'>
          {`${Number(helperData.carbs) * formData.portion}g carbs`}
        </small>
      </div>
      <div className='helper-container'>
        <small className='help helper-data'>
          {`${Number(helperData.fiber) * formData.portion}g fiber`}
        </small>
        <small className='help helper-data'>
          {`${Number(helperData.fat) * formData.portion}g fat`}
        </small>
        <small className='help helper-data'>
          {`${Number(helperData.sat_fat) * formData.portion}g sat. fat`}
        </small>
      </div>
    </div>
  )
}

export default HelperData
