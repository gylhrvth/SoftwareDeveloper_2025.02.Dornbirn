import './App.css'

function App() {

  return (
    <>
      <Placeholder title="Header" height="5rem" />
      <Placeholder title="Main Content" height="calc(100vh - 10rem)" />
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', height: '5rem'}}>
      <FooterLeft />
      <Placeholder title="Footer Right" width="100%" height="100%" />
    </div>
  )
}

function FooterLeft() {
  return (
    <div>
      <a href="#">Impressum</a>
    </div>
  )
}

function Placeholder({ 
  title, 
  width = '100%', 
  height = '100%' 
}: { 
    title: string, width?: string, height?: string
}) {
  return (
    <div style={{
      position: 'relative',
      width: width,
      height: height,
      border: '2px dashed #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafafa',
  }}>
    <span style={{
      position: 'absolute',
      top: 10,
      left: 0,
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#888',
      zIndex: 1
    }}>{title}</span>
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#bbb" strokeWidth="2" />
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="#bbb" strokeWidth="2" />
    </svg>
  </div>
  )
}

export default App
