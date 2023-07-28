export const injectSymbols = (content, symbols) => 
  content.replaceAll(/(?:\@symbol\-)([aA-zZ]+)/g,
    (_, $1) => symbols[$1]
  )

export const getSymbols = (content) => {
  const matches = content.match(/(?:\@symbol\-)([aA-zZ]+)/g)  
  return matches?.map(match => match.replace('@symbol-', '')) || []
}