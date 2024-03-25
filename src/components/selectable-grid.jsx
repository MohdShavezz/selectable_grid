import React, { useState } from 'react'
import './grid.css'

const SelectGrid = ({ row = 10, col = 10 }) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [selectBoxes, setSelectBoxes] = useState([])
  function mouseDown(number) {
    setIsMouseDown(true)
    setSelectBoxes([number])
  }
  function mouseEnter(number) {
    if (isMouseDown) {
      const startBox = selectBoxes[0]
      const endBox = number

      //remember
      const startRow = Math.floor((startBox - 1) / col)
      const startCol = (startBox - 1) % col
      const endRow = Math.floor((endBox - 1) / col)
      const endCol = (endBox - 1) % col

      // console.log(startRow,endRow,startCol,endCol)
      const maxRow = Math.max(startRow, endRow)
      const minRow = Math.min(startRow, endRow)
      const maxCol = Math.max(startCol, endCol)
      const minCol = Math.min(startCol, endCol)
      // console.log(minRow,maxRow,minCol,maxCol)
      const selected = []

      for (let i = minRow; i <= maxRow; i++) {
        for (let j = minCol; j <= maxCol; j++) {
          selected.push(i * col + j + 1)          // remember
        }
      }
      console.log(selected)
      setSelectBoxes(selected)
    }
  }
  function mouseUp() {
    setIsMouseDown(false)
  }
  return (
    <div>
      <h2>selectable grid</h2>
      <div className='grid' onMouseUp={() => mouseUp()}>
        {
          [...Array(row * col)].map((_, i) => (
            <div key={i} className={`box ${selectBoxes.includes(i+1)?'selected':''}`}
              onMouseDown={() => mouseDown(i + 1)}
              onMouseEnter={() => mouseEnter(i + 1)}
            >
              {i + 1}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SelectGrid