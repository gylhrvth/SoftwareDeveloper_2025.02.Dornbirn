export const History = ({clickedIcons}:{clickedIcons: string[]}) => {
  return (
      <>
          <div className="history">
              <h2>History</h2>

              {clickedIcons.map((icon, index) => (
                  <span key={index}>{icon}</span>
              ))}
          </div>
      </>
  )
};