import Dog from './Dog.js'
import ShelterDog from './ShelterDog.js'
import { add, divide, multiply, subtract } from './utils.js'

const dog = new Dog("dog_name", "dog_breed", 4)
dog.bark()

console.log(add(2, 3))
console.log(subtract(5, 3))
console.log(multiply(8, 9))
console.log(divide(4, 2))

const shelterDog = new ShelterDog('s_dog_n', "s_dog_b", 10, 'shelter')
shelterDog.bark()