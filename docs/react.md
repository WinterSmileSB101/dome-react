## core package

react react-dom

## LayLoad

import("./math").then(math => {
console.log(math.add(16, 26))
})

React
import React, { Suspense, useState } from 'react'

const ComputedOne = React.lazy(() => import('Components/ComputedOne'))
const ComputedTwo = React.lazy(() => import('Components/ComputedTwo'))

function App() {
const [showTwo, setShowTwo] = useState<boolean>(false)

return (
<div className='app'>
<Suspense fallback={<div>Loading...</div>}>
<ComputedOne a={1} b={2} />
{showTwo && <ComputedTwo a={3} b={4} />}
<button type='button' onClick={() => setShowTwo(true)}>
显示 Two
</button>
</Suspense>
</div>
)
}

export default App
