import React from 'react'

export const Items = ({items}: any) => {

    console.log('items length:::', items.length)
    if (items.length === 0) return null

    const ItemRow = (items: any, index: number) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{items.menuId}</td>
                  <td>{items.item}</td>
                  <td>{items.price}</td>
              </tr>
          )
    }

    const ItemTable = items.map((items: any, index: number) => ItemRow(items,index))

    return(
        <div className="container">
            <h2>Items</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Menu ID</th>
                    <th>ITEM</th>
                    <th>PRICE</th>
                </tr>
                </thead>
                <tbody>
                    {ItemTable}
                </tbody>
            </table>
        </div>
    )
}