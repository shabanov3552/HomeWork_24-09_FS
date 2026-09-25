import './App.css'
import './root-folder.css'


function App() {


  return (
    <>
      <div className="tree-block">
        <h2>Дерево файлов</h2>
        <ul className="file-tree">
          <li>
            <span className="root-node">root</span>
            <ul>
              <li>
                <span className="folder">movies</span>
                <ul>
                  <li>
                    <span className="folder">Avengers</span>
                    <ul>
                      <li><span className="file">Infinity War</span></li>
                      <li><span className="file">Endgame</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="folder">Spider-Man</span>
                    <ul>
                      <li><span className="file">Homecoming</span></li>
                      <li><span className="file">No Way Home</span></li>
                    </ul>
                  </li>
                  <li><span className="file">Iron Man</span></li>
                  <li><span className="file">Doctor Strange</span></li>
                </ul>
              </li>
              <li>
                <span className="folder">comics</span>
                <ul>
                  <li>
                    <span className="folder">X-Men</span>
                    <ul>
                      <li><span className="file">Dark Phoenix Saga</span></li>
                      <li><span className="file">Days of Future Past</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="folder">Fantastic Four</span>
                    <ul>
                      <li><span className="file">Galactus Trilogy</span></li>
                      <li><span className="file">The Coming of Galactus</span></li>
                    </ul>
                  </li>
                  <li><span className="file">Captain America</span></li>
                  <li><span className="file">Black Panther</span></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}

export default App


function FolderNode(props) {

  return (
    <>
      <span className="folder">{folderName}</span>
      <ul>
        <li><span className="file">{fileName}</span></li>
        <li><span className="file">{fileName}</span></li>
      </ul>
    </>
  )
}
