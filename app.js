console.log('connected')

const launchButton = document.querySelector('#launchButton')
const increasePower = document.querySelector('#increasePower')
const decreasePower = document.querySelector('#decreasePower')
const increaseAngle = document.querySelector('#increaseAngle')
const decreaseAngle = document.querySelector('#decreaseAngle')
const togglePath = document.querySelector('#togglePath')

const c1 = document.querySelector('#c1')
const c1cnx = c1.getContext('2d')

const c2 = document.querySelector('#c2')
const c2cnx = c2.getContext('2d')

function resizeCanvas(canvas, margin){
    let wx = window.innerWidth;
    let wy = window.innerHeight;

    (margin) ? margin : margin = 25;
    canvas.width =  wx - margin;
    canvas.height = wy - margin;
}

resizeCanvas(c1)
resizeCanvas(c2)

class Hole{
    constructor(canvas, context){
        this.canvas = canvas
        this.context = context
        this.x = window.innerWidth - 100
        this.y = window.innerHeight - 40
        this.radiusX = 50
        this.radiusY = 10
        this.rotation = 0
        this.startAngle = 0
        this.endAngle = 2 * Math.PI
        this.context.fillStyle = '#333'
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 6
    }

    draw(){
        // this.moveX = this.x - (Math.floor(Math.random(window.innerWidth / 0.25))+1)
        this.moveX = Math.floor(Math.random()*(window.innerWidth-75))+50
        // this.moveY = Math.floor(Math.random()*((window.innerHeight / 2)-50))+50
        this.moveY = Math.floor(Math.random()*(window.innerHeight - 300))+200
        this.context.save()
        this.context.beginPath()
        this.context.ellipse(this.moveX, this.moveY, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
        // this.context.fill()
        this.context.stroke()
        
        this.context.restore()
    }
}
class Ball{
    constructor(canvas, context){
        this.canvas = canvas
        this.context = context
        this.cw = this.canvas.width
        this.ch = this.canvas.height
        this.x = 50
        this.y = this.ch - 50
        this.radius = 25
        this.arcStart = 0
        this.arcEnd = 2 * Math.PI 
        this.lineWidth = 2
        this.fillStyle = 'black'
        this.strokeStyle = 'black'
        this.velocityX = 10
        this.velocityY = 10
        this.gravity = 9.8 / 20
        this.direction = -1
        this.landed = false
        this.resetParams = [this.x, this.y, this.velocityY, this.gravity, this.landed]
    }

    clear({context} = this){
        context.clearRect(0 ,0, this.canvas.width, this.canvas.height)
    }

    draw({context, x, y, velocityY, radius, arcStart, arcEnd} = this){
        
        context.save()
        context.beginPath()
        context.arc(x, y + velocityY, radius, arcStart, arcEnd )
        context.stroke()
        context.restore()
    }

    launch(){
        this.y += this.velocityY * this.direction
        this.velocityY -= this.gravity
        this.x += this.velocityX
        if(this.y >= this.ch){
            this.y = this.ch
            this.velocityY = 0
            this.gravity = 0
            this.landed = true
        }
    }

    set(){
        this.resetParams[2] = this.velocityY
    }

    reset(){
        this.x = this.resetParams[0]
        this.y = this.resetParams[1]
        this.velocityY = this.resetParams[2]
        this.gravity = this.resetParams[3]
        this.landed = this.resetParams[4]
    }

    checkEnding(){
        // console.log(this.x, this.y)
    }
}

let cnx = 0
let clearP = false
const ball1 = new Ball(c1, c1cnx)
const hole1 = new Hole(c2, c2cnx)


ball1.draw()
hole1.draw()

function animate(){
    (!clearP) ? ball1.clear() : null
    ball1.draw()
    ball1.launch();
    (!ball1.landed) ? window.requestAnimationFrame(animate) :
        ball1.checkEnding();
}

increasePower.addEventListener('click', ()=>{
    ball1.reset()
    ball1.velocityX +=1
    ball1.set()
    increasePower.innerHTML = `&#8594;: ${ball1.velocityX}`
    decreasePower.innerHTML = `&#8592;: ${ball1.velocityX}`
})

decreasePower.addEventListener('click', ()=>{
    ball1.reset()
    ball1.velocityX -=1
    ball1.set()
    increasePower.innerHTML = `&#8594;: ${ball1.velocityX}`
    decreasePower.innerHTML = `&#8592;: ${ball1.velocityX}`
})

increaseAngle.addEventListener('click', ()=>{
    ball1.reset()
    ball1.velocityY +=1
    ball1.set()
    increaseAngle.innerHTML = `&#8593;: ${ball1.velocityY}`
    decreaseAngle.innerHTML = `&#8595;: ${ball1.velocityY}`
})

decreaseAngle.addEventListener('click', ()=>{
    ball1.reset()
    ball1.velocityY -=1
    ball1.set()
    increaseAngle.innerHTML = `&#8593;: ${ball1.velocityY}`
    decreaseAngle.innerHTML = `&#8595;: ${ball1.velocityY}`
})

togglePath.addEventListener('click' , ()=>{
    (!clearP) ? clearP = true: clearP = false
    togglePath.innerText = `see path: ${clearP}`
    // console.log(clearP)
})

launchButton.addEventListener('click', ()=>{
    ball1.reset()
    animate()
})

window.addEventListener('resize', ()=>{
    location.reload()
})