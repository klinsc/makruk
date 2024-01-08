import {
  Button,
  Col,
  Image,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const whitePieces = [
  {
    id: 'white-khun',
    name: 'Khun',
    image: '/chesses/white_khun.svg',
  },
  {
    id: 'white-met',
    name: 'Met',
    image: '/chesses/white_met.svg',
  },
  {
    id: 'white-ma-1',
    name: 'Ma',
    image: '/chesses/white_ma.svg',
  },
  {
    id: 'white-ma-2',
    name: 'Ma',
    image: '/chesses/white_ma.svg',
  },
  {
    id: 'white-ruea-1',
    name: 'Ruea',
    image: '/chesses/white_ruea.svg',
  },
  {
    id: 'white-ruea-2',
    name: 'Ruea',
    image: '/chesses/white_ruea.svg',
  },
  {
    id: 'white-khon-1',
    name: 'Khon',
    image: '/chesses/white_khon.svg',
  },
  {
    id: 'white-khon-2',
    name: 'Khon',
    image: '/chesses/white_khon.svg',
  },
  ...Array.from({
    length: 8,
  }).map((_, i) => ({
    id: `white-bia-${i + 1}`,
    name: 'Bia',
    image: '/chesses/white_bia.svg',
  })),
  ,
]

const blackPieces = [
  {
    id: 'black-khun',
    name: 'Khun',
    image: '/chesses/black_khun.svg',
  },
  {
    id: 'black-met',
    name: 'Met',
    image: '/chesses/black_met.svg',
  },
  {
    id: 'black-ma-1',
    name: 'Ma',
    image: '/chesses/black_ma.svg',
  },
  {
    id: 'black-ma-2',
    name: 'Ma',
    image: '/chesses/black_ma.svg',
  },
  {
    id: 'black-ruea-1',
    name: 'Ruea',
    image: '/chesses/black_ruea.svg',
  },
  {
    id: 'black-ruea-2',
    name: 'Ruea',
    image: '/chesses/black_ruea.svg',
  },
  {
    id: 'black-khon-1',
    name: 'Khon',
    image: '/chesses/black_khon.svg',
  },
  {
    id: 'black-khon-2',
    name: 'Khon',
    image: '/chesses/black_khon.svg',
  },
  ...Array.from({
    length: 8,
  }).map((_, i) => ({
    id: `black-bia-${i + 1}`,
    name: 'Bia',
    image: '/chesses/black_bia.svg',
  })),
]

const defaultChessBoard = [
  [
    'black-ruea-1',
    'black-ma-1',
    'black-khon-1',
    'black-met',
    'black-khun',
    'black-khon-2',
    'black-ma-2',
    'black-ruea-2',
  ],
  [
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
  ],
  [
    'black-bia-1',
    'black-bia-2',
    'black-bia-3',
    'black-bia-4',
    'black-bia-5',
    'black-bia-6',
    'black-bia-7',
    'black-bia-8',
  ],
  [
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
  ],
  [
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
  ],
  [
    'white-bia-1',
    'white-bia-2',
    'white-bia-3',
    'white-bia-4',
    'white-bia-5',
    'white-bia-6',
    'white-bia-7',
    'white-bia-8',
  ],
  [
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
    'blank',
  ],
  [
    'white-ruea-1',
    'white-ma-1',
    'white-khon-1',
    'white-khun',
    'white-met',
    'white-khon-2',
    'white-ma-2',
    'white-ruea-2',
  ],
]

export default function Home() {
  // state: ตำแหน่งของหมากแต่ละ id บนกระดาน
  const [chessBoard, setChessBoard] = useState<
    Array<Array<string | null>>
  >([...defaultChessBoard])
  // state: ประวัติของตำแหน่งของหมากแต่ละ id บนกระดาน ในแต่ละเทิร์น
  const [chessBoardHistory, setChessBoardHistory] =
    useState<Array<Array<Array<string | null>>> | null>(
      null,
    )
  // state: id ของหมากที่ถูกเลือก
  const [selectedPieceId, setSelectedPieceId] = useState<
    string | null
  >(null)
  // state: ช่องที่เดินได้ของหมากที่ถูกเลือก
  const [moveablePositions, setMoveablePositions] =
    useState<Array<Array<number>>>([])
  // state: ช่องที่กินได้ของหมากที่ถูกเลือก
  const [eatablePositions, setEatablePositions] = useState<
    Array<Array<number>>
  >([])

  // state: ตาเดินของสีขาวหรือดำ
  const [turn, setTurn] = useState<'WHITE' | 'BLACK'>(
    'WHITE',
  )
  // state: สีหมากของคุณ
  const [yourColor, setYourColor] = useState<
    'WHITE' | 'BLACK' | null
  >(null)

  // effect: initial load your color from local storage
  // effect: โหลดสีของคุณจาก local storage
  useEffect(() => {
    const yourColorFromLocalStorage =
      localStorage.getItem('yourColor')
    if (yourColorFromLocalStorage) {
      setYourColor(
        yourColorFromLocalStorage as 'WHITE' | 'BLACK',
      )
    }
  }, [])

  // effect: when your color is changed, save it to local storage
  // effect: เมื่อสีของคุณเปลี่ยน บันทึกลง local storage
  useEffect(() => {
    if (yourColor) {
      localStorage.setItem('yourColor', yourColor)
    }
  }, [yourColor])

  // effect: when the chess board is changed,
  // change chessBoardHistory
  useEffect(() => {
    const newChessBoardHistory = chessBoardHistory
      ? [...chessBoardHistory, chessBoard]
      : [chessBoard]
    setChessBoardHistory(newChessBoardHistory)
  }, [chessBoard])

  // handler: reset the chessboard
  const handleResetChessBoard = useCallback(() => {
    setChessBoard([...defaultChessBoard])
    setChessBoardHistory(null)
    localStorage.removeItem('chessBoardHistory')
  }, [])

  // handler: save the chessbord history to local storage
  const handleSaveChessBoardHistory = useCallback(() => {
    localStorage.setItem(
      'chessBoardHistory',
      JSON.stringify(chessBoardHistory),
    )
  }, [chessBoardHistory])

  // handler: load the chessbord history from local storage
  const handleLoadChessBoardHistory = useCallback(() => {
    const chessBoardHistoryFromLocalStorage =
      localStorage.getItem('chessBoardHistory')
    if (chessBoardHistoryFromLocalStorage) {
      const chessBoardHistory = JSON.parse(
        chessBoardHistoryFromLocalStorage,
      )
      setChessBoardHistory(chessBoardHistory)

      // set the chess board to the last one
      setChessBoard(
        chessBoardHistory[chessBoardHistory.length - 1],
      )
    }
  }, [])

  // handler: when user click on a piece, calculate the moveable positions
  // and highlight them
  const handleSelectPiece = useCallback(
    (pieceId: string) => {
      setSelectedPieceId(pieceId)
    },
    [],
  )
  const handleNewMovablePositions = useCallback(
    (pieceId: string) => {
      // const: bottom pieces are white
      const bottomPiecesColor = 'WHITE'

      // find the piece color
      const pieceForward = pieceId.includes(
        bottomPiecesColor.toLocaleLowerCase(),
      )
        ? 'up'
        : 'down'

      // get the position of the piece in i,j
      const position = chessBoard
        .filter((item) => item.includes(pieceId))
        .map((item) => [
          item.indexOf(pieceId),
          chessBoard.indexOf(item),
        ])[0]
      const positionIndex = [position[1], position[0]]

      // get the moveable positions
      const moveablePositions = getMoveablePositions(
        pieceId,
        positionIndex,
        pieceForward,
      )

      // filter out the positions that are occupied by the same color
      const filteredSameColor = moveablePositions.filter(
        (item) => {
          const pieceId = chessBoard[item[0]][item[1]]
          if (pieceId === 'blank') return true

          if (pieceId) {
            const pieceColor = pieceId.includes('white')
              ? 'white'
              : 'black'
            const selectedPieceColor = pieceId.includes(
              'white',
            )
              ? 'white'
              : 'black'
            return pieceColor !== selectedPieceColor
          }
          return true
        },
      )
      // set the moveable positions
      setMoveablePositions(filteredSameColor)

      // คำนวณหาหมากของสีตรงข้ามจาก moveablePositions
      const newEatablePositions = moveablePositions.filter(
        (item) => {
          const itemId = chessBoard[item[0]][item[1]]
          if (itemId === 'blank') return false

          if (itemId) {
            const pieceColor = itemId.includes('white')
              ? 'white'
              : 'black'
            const selectedPieceColor = pieceId.includes(
              'white',
            )
              ? 'white'
              : 'black'
            return pieceColor !== selectedPieceColor
          }
          return false
        },
      )

      // set the eatable positions
      setEatablePositions(newEatablePositions)
    },
    [chessBoard],
  )

  const getMoveablePositions = useCallback(
    (
      pieceId: string,
      position: Array<number>,
      pieceForward: 'up' | 'down',
    ) => {
      const pieceName =
        whitePieces.find(
          (item) => item && item.id === pieceId,
        ) ||
        blackPieces.find(
          (item) => item && item.id === pieceId,
        )

      switch (pieceName.name) {
        case 'Khun':
          return getKhunMoveablePositions(
            pieceId,
            position,
            pieceForward,
          )
        case 'Bia':
          return getBiaMoveablePositions(
            pieceId,
            position,
            pieceForward,
          )
        // case 'Met':
        //   return getMetMoveablePositions(
        //     letterIndex,
        //     numberIndex,
        //   )
        // case 'Ma':
        //   return getMaMoveablePositions(
        //     letterIndex,
        //     numberIndex,
        //   )
        // case 'Ruea':
        //   return getRueaMoveablePositions(
        //     letterIndex,
        //     numberIndex,
        //   )
        // case 'Khon':
        //   return getKhonMoveablePositions(
        //     letterIndex,
        //     numberIndex,
        //   )
        default:
          return []
      }
    },
    [],
  )

  const getKhunMoveablePositions = useCallback(
    (
      pieceId: string,
      position: Array<number>,
      pieceForward: 'up' | 'down',
    ) => {
      const moveablePositions: Array<Array<number>> = []

      // the Khun ignores the pieceForward
      // get the upper row
      const upperRow = chessBoard[position[0] - 1] || []
      if (upperRow.length > 0) {
        // get the 3 positions in front of the piece
        const threePositionsInFront = upperRow.slice(
          position[1] - 1,
          position[1] + 2,
        )

        moveablePositions.push(
          ...threePositionsInFront.map((_, i) => [
            position[0] - 1,
            position[1] - 1 + i,
          ]),
        )
      }
      // get the lower row
      const lowerRow = chessBoard[position[0] + 1] || []
      if (lowerRow.length > 0) {
        // get the 3 positions behind the piece
        const threePositionsBehind = lowerRow.slice(
          position[1] - 1,
          position[1] + 2,
        )

        moveablePositions.push(
          ...threePositionsBehind.map((_, i) => [
            position[0] + 1,
            position[1] - 1 + i,
          ]),
        )
      }
      // get the left and right positions
      const leftPosition =
        chessBoard[position[0]][position[1] - 1]
      const rightPosition =
        chessBoard[position[0]][position[1] + 1]
      if (leftPosition) {
        moveablePositions.push([
          position[0],
          position[1] - 1,
        ])
      }
      if (rightPosition) {
        moveablePositions.push([
          position[0],
          position[1] + 1,
        ])
      }

      return moveablePositions
    },
    [chessBoard],
  )

  const getBiaMoveablePositions = useCallback(
    (
      pieceId: string,
      position: Array<number>,
      pieceForward: 'up' | 'down',
    ) => {
      const moveablePositions: Array<Array<number>> = []

      // if move up, get the upper row
      if (pieceForward === 'up') {
        const upperRow = chessBoard[position[0] - 1] || []
        if (upperRow.length > 0) {
          // get the 1 positions in front of the piece
          const threePositionsInFront = upperRow.slice(
            position[1],
            position[1] + 1,
          )

          moveablePositions.push(
            ...threePositionsInFront.map((_, i) => [
              position[0] - 1,
              position[1] + i,
            ]),
          )
        }
      } else if (pieceForward === 'down') {
        // if move down, get the lower row
        const lowerRow = chessBoard[position[0] + 1] || []
        if (lowerRow.length > 0) {
          // get the 1 positions behind the piece
          const threePositionsBehind = lowerRow.slice(
            position[1],
            position[1] + 1,
          )

          moveablePositions.push(
            ...threePositionsBehind.map((_, i) => [
              position[0] + 1,
              position[1] + i,
            ]),
          )
        }
      }

      return moveablePositions
    },
    [chessBoard],
  )

  // handler: when user click on a moveable position, move the piece to that position
  // and clear the moveable positions
  const handleMovePiece = useCallback(
    (position: Array<number>) => {
      // set new chess board
      const newChessBoard = chessBoard.map((item, i) =>
        item.map((subItem, j) => {
          if (subItem === selectedPieceId) {
            return null
          }
          if (i === position[0] && j === position[1]) {
            return selectedPieceId
          }
          return subItem
        }),
      )

      // set the new chess board
      setChessBoard(newChessBoard)

      // set the new turn
      setTurn(turn === 'WHITE' ? 'BLACK' : 'WHITE')

      // clear the moveable positions
      setMoveablePositions([])

      // clear the selected piece
      setSelectedPieceId(null)
    },
    [chessBoard, selectedPieceId, turn],
  )

  // handler: when user click on a eatable position, eat the piece
  // and move the piece to that position
  // and clear the moveable positions
  const handleEatPiece = useCallback(
    (position: Array<number>) => {
      // set new chess board
      const newChessBoard = chessBoard.map((item, i) =>
        item.map((subItem, j) => {
          if (subItem === selectedPieceId) {
            return null
          }
          if (i === position[0] && j === position[1]) {
            return selectedPieceId
          }
          return subItem
        }),
      )

      // set the new chess board
      setChessBoard(newChessBoard)

      // set the new turn
      setTurn(turn === 'WHITE' ? 'BLACK' : 'WHITE')

      // clear the moveable positions
      setMoveablePositions([])

      // clear the eatable positions
      setEatablePositions([])

      // clear the selected piece
      setSelectedPieceId(null)
    },
    [chessBoard, selectedPieceId, turn],
  )

  return (
    <>
      <Head>
        <title>ตัวอย่างหมากรุกไทย</title>
        <meta
          name="description"
          content="ตัวอย่างสำหรับใช้เรียนการเขียนเกมหมากรุกไทยด้วย React.js และ Next.js"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Typography.Title
          level={1}
          style={{
            color: '#fff',
          }}>
          หมากรุกไทย
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: '#fff',
          }}>
          {`ตาเดิน: ${turn === 'WHITE' ? 'ขาว' : 'ดำ'}`}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: '#fff',
          }}>
          {`สีของคุณ: ${
            yourColor === 'WHITE' ? 'ขาว' : 'ดำ'
          }`}
        </Typography.Title>
        <Radio.Group
          value={yourColor}
          onChange={(e) => {
            setYourColor(e.target.value)
          }}>
          <Radio
            value="WHITE"
            style={{
              color: '#fff',
            }}>
            ขาว
          </Radio>
          <Radio
            value="BLACK"
            style={{
              color: '#fff',
            }}>
            ดำ
          </Radio>
        </Radio.Group>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: '#fff',
          }}>
          {`หมากที่ถูกเลือก: ${selectedPieceId}`}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: '#fff',
          }}>
          {`ช่องที่เดินได้: ${JSON.stringify(
            moveablePositions,
          )}`}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: '#fff',
          }}>
          {`ช่องที่กินได้: ${JSON.stringify(
            eatablePositions,
          )}`}
        </Typography.Title>

        <div
          style={{
            width: 640,
            backgroundColor: '#fff',
            border: '1px solid #000',
          }}>
          {Array.from({
            length: 8,
          }).map((_, i) => (
            <Row key={i}>
              {Array.from({
                length: 8,
              }).map((_, j) => {
                // convert to chess notation
                const letter = String.fromCharCode(
                  97 + j,
                ).toUpperCase()

                // get image of the piece
                const pieceId = chessBoard[i][j]
                  ? chessBoard[i][j]
                  : null

                // get the piece object
                const pieceObject = pieceId
                  ? whitePieces.find(
                      (item) => item && item.id === pieceId,
                    ) ||
                    blackPieces.find(
                      (item) => item && item.id === pieceId,
                    )
                  : null

                // check if the piece is at its turn
                const isPieceAtTurn =
                  pieceObject &&
                  turn.toLowerCase() ===
                    (pieceObject.id.includes('white')
                      ? 'white'
                      : 'black')

                // check if the position is moveable
                let isMoveablePosition = false
                if (moveablePositions.length > 0) {
                  isMoveablePosition =
                    moveablePositions.some(
                      (item) =>
                        item[0] === i && item[1] === j,
                    )
                }

                // check if the position is eatable
                let isEatablePosition = false
                if (eatablePositions.length > 0) {
                  isEatablePosition = eatablePositions.some(
                    (item) =>
                      item[0] === i && item[1] === j,
                  )
                }

                return (
                  <Col
                    key={`${letter}-${8 - i}`}
                    span={3}
                    style={{
                      // if the piece is selected, add a bigger dashed border
                      border:
                        pieceObject &&
                        selectedPieceId === pieceObject.id
                          ? '4px dashed #000'
                          : '2px solid #000',

                      height: 80,
                      width: 80,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',

                      // add shadow if the piece is selected
                      boxShadow:
                        pieceObject &&
                        selectedPieceId === pieceObject.id
                          ? '0 0 10px 5px #000'
                          : '',
                    }}>
                    {pieceObject && (
                      <Image
                        preview={false}
                        alt="chess"
                        // if the piece is selected, make it bigger
                        width={
                          selectedPieceId === pieceObject.id
                            ? 80
                            : 66
                        }
                        height={
                          selectedPieceId === pieceObject.id
                            ? 80
                            : 66
                        }
                        src={pieceObject.image}
                        style={{
                          // shows the cursor if the piece is at its turn
                          cursor: isPieceAtTurn
                            ? 'pointer'
                            : '',

                          // shows animation if the piece is at its turn
                          // แสดง animation ถ้าเป็นตาของหมากที่ถูกเลือก
                          animation:
                            !selectedPieceId &&
                            isPieceAtTurn
                              ? 'pieceMoveable 2s linear infinite'
                              : '',

                          // rotate 3d if the piece is selected
                          transform:
                            selectedPieceId ===
                            pieceObject.id
                              ? 'rotate3d(0,1,1, 20deg)'
                              : '',
                        }}
                        onClick={() => {
                          if (!isPieceAtTurn) return

                          // if click on the same piece, deselect it
                          if (
                            selectedPieceId ===
                            pieceObject.id
                          ) {
                            setSelectedPieceId(null)
                            setMoveablePositions([])
                            setEatablePositions([])
                            return
                          }

                          handleSelectPiece(pieceObject.id)
                          handleNewMovablePositions(
                            pieceObject.id,
                          )
                        }}
                      />
                    )}
                    {
                      // if the position is moveable, add a border
                      isMoveablePosition && (
                        <div
                          style={{
                            position: 'absolute',
                            height: 40,
                            width: 40,
                            borderRadius: '50%',
                            backgroundColor:
                              'rgba(114,114,114,.5)',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            handleMovePiece([i, j])
                          }}
                        />
                      )
                    }
                    {
                      // if the position is eatable, add a border
                      isEatablePosition && (
                        <div
                          style={{
                            position: 'absolute',
                            height: 66,
                            width: 66,
                            borderRadius: '50%',
                            backgroundColor:
                              'rgba(0,255,0,.5)',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            handleEatPiece([i, j])
                          }}
                        />
                      )
                    }
                    {/* {<div>{`${i},${j}`}</div>} */}
                  </Col>
                )
              })}
            </Row>
          ))}
        </div>

        {/* Reset, Save & Load chessboard */}
        <div
          style={{
            width: 640,
            border: '1px solid #000',
          }}>
          <Space style={{ margin: '1rem' }}>
            <Button onClick={() => handleResetChessBoard()}>
              Reset
            </Button>
            <Button
              onClick={() => handleSaveChessBoardHistory()}>
              Save
            </Button>
            <Button
              onClick={() => handleLoadChessBoardHistory()}>
              Load
            </Button>
          </Space>
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              color: '#fff',
            }}>
            History
          </Typography.Title>
          {
            // show the history
            chessBoardHistory &&
              chessBoardHistory.map((item, i) => (
                <Typography.Title
                  key={i}
                  level={5}
                  style={{
                    margin: 0,
                    color: '#fff',
                  }}>
                  {JSON.stringify(item)}
                </Typography.Title>
              ))
          }
        </div>
      </main>
    </>
  )
}
