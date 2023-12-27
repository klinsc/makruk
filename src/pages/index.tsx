import { Col, Image, Row, Space } from 'antd'
import Head from 'next/head'
import { useCallback, useState } from 'react'

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

export default function Home() {
  const [chessBoard, setChessBoard] = useState<
    Array<Array<string | null>>
  >([
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
  ])
  const [selectedPieceId, setSelectedPieceId] = useState<
    string | null
  >(null)
  const [moveablePositions, setMoveablePositions] =
    useState<Array<Array<number>>>([])

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
      const bottomPiecesColor = 'white'

      // find the piece color
      const pieceForward = pieceId.includes(
        bottomPiecesColor,
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
        // case 'Bia':
        //   return getBiaMoveablePositions(
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
      debugger

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

  // handler: when user click on a moveable position, move the piece to that position
  // and clear the moveable positions
  const handleMovePiece = useCallback(
    (position: Array<number>) => {
      debugger
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

      // clear the moveable positions
      setMoveablePositions([])

      // clear the selected piece
      setSelectedPieceId(null)
    },
    [chessBoard, selectedPieceId],
  )

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 16,
          }}>{`Selected piece: ${selectedPieceId}`}</div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 16,
          }}>{`Moveable positions: ${JSON.stringify(
          moveablePositions,
        )}`}</div>
        <div
          style={{
            width: 640,
            backgroundColor: '#fff',
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

                let isMoveablePosition = false
                if (moveablePositions.length > 0) {
                  // if the position is moveable, add a border
                  isMoveablePosition =
                    moveablePositions.some(
                      (item) =>
                        item[0] === i && item[1] === j,
                    )
                }

                return (
                  <Col
                    key={`${letter}-${8 - i}`}
                    span={3}
                    style={{
                      // if the piece is selected, add a border
                      border:
                        pieceObject &&
                        selectedPieceId === pieceObject.id
                          ? '2px dashed #000'
                          : '2px solid #000',
                      backgroundColor: '#cb8a47',
                      height: 80,
                      width: 80,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {pieceObject && (
                      <Image
                        preview={false}
                        alt="chess"
                        width={40}
                        height={40}
                        src={pieceObject.image}
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
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
                    {<Space>{`${i},${j}`}</Space>}
                  </Col>
                )
              })}
            </Row>
          ))}
        </div>
      </main>
    </>
  )
}
