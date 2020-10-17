export default function Examples() {
  return (
    <>
      <div>
        <p>
          Row without container, horizontal alignment centered, vertical
          alignment center
        </p>
        <div className="ntw-min-height flex w-full my-4 p-1 h-full bg-gray-200 justify-center items-center">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
      <div>
        <p>
          Row without container, horizontal alignment left, vertical alignment
          top
        </p>
        <div className="ntw-min-height flex w-full my-4 p-1 min-h-full bg-gray-200 justify-start items-start">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
      <div>
        <p>
          Row without container, horizontal alignment right, vertical alignment
          bottom
        </p>
        <div className="ntw-min-height flex w-full my-4 p-1 min-h-full bg-gray-200 justify-end items-end">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
      <div>
        <p>
          Row without container, horizontal alignment full line, vertical
          alignment center
        </p>
        <div className="ntw-min-height flex w-full my-4 p-1 min-h-full bg-gray-200 justify-between items-center">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
      <div>
        <p>Row with container</p>
        <div className="ntw-min-height flex container my-0 mx-auto p-1 min-h-full bg-red-200 justify-center items-center">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
    </>
  );
}
