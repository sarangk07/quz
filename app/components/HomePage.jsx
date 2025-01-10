'use client'

import React, { useEffect, useState,useMemo,useCallback } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import Image from 'next/image'
import quizData from '../localData/quzQandA'


import { 
  setChoice1,
  setQuestions,
  setCurrentQuestionIndex,
  setScore,
  setTimeLeft,
  setIsFrozen,
 } from '../store/quizSlice'

import { HashLoader } from 'react-spinners'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'



function HomePage() {
  const [removedOptions, setRemovedOptions] = useState([]);
  const [freezCount, setFreezCount] = useState(3); 
  const [removeOptsCount, setRemoveOptsCount] = useState(3); 
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [api,setApi] = useState('https://opentdb.com/api.php?amount=25')
  const [loading ,setLoading] = useState(false)
  const [theme,setTheme] = useState('default')

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [striks,setStriks] = useState(0)

   
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); 
  };

  useEffect(() => {
    let apiUrl;
    switch (selectedCategory) {
      case 'movies':
        apiUrl = 'https://opentdb.com/api.php?amount=25&category=11';
        break;
      case 'games':
        apiUrl = 'https://opentdb.com/api.php?amount=25&category=15'; 
        break;
      case 'computers':
        apiUrl = 'https://opentdb.com/api.php?amount=25&category=18'; 
        break;
      case 'music':
        apiUrl = 'https://opentdb.com/api.php?amount=25&category=12'; 
        break;
      case 'Vehicles':
        apiUrl = 'https://opentdb.com/api.php?amount=25&category=28'; 
        break;
      case 'Programing':
        apiUrl = ''; 
        break;
      case 'JS':
        apiUrl = ''; 
        break;
      case 'PY':
        apiUrl = ''; 
        break;
      default:
        apiUrl = 'https://opentdb.com/api.php?amount=25';
        break;
    }

    setApi(apiUrl);

  }, [selectedCategory]);


  const dispatch = useDispatch();
  const {
    choice1,questions,currentQuestionIndex,score,timeLeft,isFrozen,
  } = useSelector((state) => state.quiz);

  const memoizedQuestions = useMemo(() => questions, [questions])
// console.log(questions,'qstiong,,,,,,,,,,,,,,');

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled;
  }, []);

 
  const getNextQuestion = useCallback((index) => {
    const question = memoizedQuestions[index]
    if (!question) return null
    const options = shuffleArray([...question.incorrect_answers, question.correct_answer])
    return { ...question, options }
  }, [memoizedQuestions, shuffleArray])

  const currentQuestion = useMemo(() => getNextQuestion(currentQuestionIndex), [getNextQuestion, currentQuestionIndex]);
  
  useEffect(() => {
    if (choice1 === 'all') {
      fetchQuestions()
    }
  }, [choice1])

  useEffect(() => {
    let timer
    if (choice1 === 'all' && timeLeft > 0 && !isFrozen) {  
      timer = setTimeout(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000)
    } else if (timeLeft === 0) {
      moveToNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, choice1, isFrozen]) 
  

  //custom datas 50 question only-------
  const getRandomQuestions = (questions, num) => {
      const shuffledQuestions = shuffleArray(questions);
      return shuffledQuestions.slice(0, num);
  };


  


//fetching questions-----------------
const fetchQuestions = async () => {
  try {
      setLoading(true);
      
      if (selectedCategory === 'Programing') {
          
          const randomQuestions = getRandomQuestions(quizData, 50);
          dispatch(setQuestions(randomQuestions));
      }else if(selectedCategory === 'PY'){
        let fljsdata = quizData.filter((x)=>x.category == 'Python');
        // console.log('py datas filtered------',fljsdata)
        const randomQuestions = getRandomQuestions(fljsdata, 40);
        dispatch(setQuestions(randomQuestions));
      }else if(selectedCategory === 'JS'){
        let flpydata = quizData.filter((x)=>x.category == 'JavaScript');
        // console.log('js datas filtered------',flpydata)
        const randomQuestions = getRandomQuestions(flpydata, 40);
        dispatch(setQuestions(randomQuestions));
      }
      else {  
          const response = await axios.get(api);
          const decodedQuestions = response.data.results.map(q => ({
              ...q,
              question: decodeHTMLEntities(q.question),
              correct_answer: decodeHTMLEntities(q.correct_answer),
              incorrect_answers: q.incorrect_answers.map(decodeHTMLEntities)
          }));
          dispatch(setQuestions(decodedQuestions));
      }
  } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Connection Time Out!!! Try Again');   
  } finally {
      setLoading(false);
  }
};


  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
  }

 


  //answer clicking logics
  const handleAnswerClick = (selectedAnswer) => {
      setSelectedAnswer(selectedAnswer);
      const isAnswerCorrect = selectedAnswer === currentQuestion.correct_answer;
      setIsCorrect(isAnswerCorrect);
      
      if (isAnswerCorrect) {
          dispatch(setScore(score + 1));
          setStriks(striks+1)
      }else{
          setStriks(0)
      }
      
      // showing correct or wrong answer effect
      setTimeout(() => {
          moveToNextQuestion();
          setSelectedAnswer(null);
          setIsCorrect(false);
      }, 1000);
  };





  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      dispatch(setCurrentQuestionIndex(nextIndex));
      dispatch(setTimeLeft(30));
    } else {
      dispatch(setChoice1('finished'));
    }
    dispatch(setTimeLeft(30));
  };
  



//featuress.......................................

  //freez
  const handleFreez = () => {
    if (freezCount > 0) { 
      dispatch(setIsFrozen(true)); 
      setFreezCount(freezCount - 1); 
  
      setTimeout(() => {
        dispatch(setIsFrozen(false)); 
      }, 7000);
    } else {
      console.log('No Freez available'); 
    }
  };
  

  //2 removes
  const handleRemoveOpts = () => {
    if (removeOptsCount > 0 && currentQuestion) {
      const incorrectAnswers = currentQuestion.options.filter(
        option => option !== currentQuestion.correct_answer
      );
      const optionsToRemove = shuffleArray(incorrectAnswers).slice(0, 2);
      setRemovedOptions(optionsToRemove); 
      setRemoveOptsCount(removeOptsCount - 1); 
    }
  };


  
  useEffect(() => {
    if ([5, 8,11, 14,17, 20, 23].includes(score)) {
      dispatch(setIsFrozen(true)); 
      handleMysteryBox(); 
    }
  }, [score]);



  //gift box
  const handleMysteryBox = () => {
    const random = Math.random();
    if (random <= 0.4) {
      setFreezCount(freezCount + 1);
      toast('Won a Freeze',
        {
          icon: '❄️',
          style: {
            borderRadius: '10px',
            background: 'transparent',
            color: '#fff',
          },
        }
      );
      
    } else {
      setRemoveOptsCount(removeOptsCount + 1); 
      toast('Won a Strike 2',
        {
          icon: '🗞️',
          style: {
            borderRadius: '10px',
            background: 'transparent',
            color: '#fff',
          },
        }
      );

    }
    dispatch(setIsFrozen(false));
  };

  //---------------------------------------------------------------
  

  if (loading) {
    return<div className='flex justify-center bg-black items-center w-full h-screen'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <HashLoader color={'#4be8b9'}/>
      </div>
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {choice1 === 'selected' ? (
        <div>
          <button className='mb-4' onClick={() => dispatch(setChoice1('default'))}>
            back
          </button>
          selected
        </div>
      ) : choice1 === 'all' ? (
        <>
        
        <div className={`flex justify-center items-center w-full h-screen bg-black text-white`}>
          <button className='mb-5 absolute top-2 left-2' onClick={() => dispatch(setChoice1('default'))}>
            Quit
          </button>
          <div className='mb-4 flex flex-col absolute justify-start items-start top-11 left-2'>
            <div className='flex cursor-pointer'>
            <p onClick={()=>setTheme('amber')} className='mr-4 hover:animate-pulse rotate-45 bg-amber-500 w-5 h-5'/>
            <p onClick={()=>setTheme('red')} className='mr-4 w-5 h-5 hover:animate-pulse rotate-45 bg-red-600'/>
            <p onClick={()=>setTheme('violet')} className='mr-4 w-5 h-5 hover:animate-pulse rotate-45 bg-violet-600'/>
            <p onClick={()=>setTheme('default')} className='rotate-45 hover:animate-pulse bg-emerald-500 w-5 h-5'/>
            </div>



            <div className='flex pl-2 items-start justify-start'>
            <p className={`${isFrozen ? 'text-emerald-300 font-extrabold font-mono' : ''} text-2xl mb-2 ${timeLeft<10 ? 'animate-ping text-red-600' : '' }  mt-5`}>{timeLeft}</p>
            </div>

          </div>
          <div className='absolute flex flex-col justify-center items-center text-center top-1'>
            <p className='text-xs'>{selectedCategory}</p>
            <p className='mt-4 text-xs '>Score: <span className={`${score>10 ? 'text-blue-600' : score>20 ? 'text-green-600' : ''}`}>{score}</span></p>
            <p className='text-sm'>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className={`${striks <= 0 ?'hidden' :'flex'} ${striks >= 5 ? 'text-blue-500' : striks >= 10  ? 'text-red-500' : 'text-emerald-300'}  justify-center text-lg animate-pulse font-extrabold font-mono`}>{striks} <span className='text-sm flex justify-end items-end'>X</span></p>
          </div>

          

          <div className='absolute flex bottom-2'>
            {currentQuestion && currentQuestion.type == 'boolean' ?
            <>
            </>
            :
            <>
            <button className='mr-5 flex flex-col items-center' onClick={handleRemoveOpts } disabled={removeOptsCount === 0}>
              <span className='font-mono text-xs'>Strike 2</span>
              <Image src="/remove2.png" alt="remove"  width={40} height={40}/>
              <span className='text-xs'>
              ({removeOptsCount})
              </span>
              </button>
            </>
            }

            <button  className='flex flex-col items-center'
              onClick={handleFreez} 
              disabled={freezCount === 0} 
            >
              <span className='font-mono text-xs'>Freeze[7s]</span>
              <Image src="/freeze.png" alt="freeze" width={45} height={45}/>
              <span className='text-xs'>({freezCount})</span>
            </button>
          </div>
                
          {currentQuestion && (
            <div className='relative flex justify-center items-center md:w-[720px] md:h-[500px] w-72 h-64 '>
             
              <div className={` flex flex-col items-center justify-center `}>
                <h1 className={`${timeLeft < 7 ? ' ' : ' '} relative border-4 border-zinc-900 border-double -top-10 break-all text-center ${theme == 'amber' ? 'bg-amber-500' : theme == 'violet' ? 'bg-violet-600' : theme == 'red' ? 'bg-red-600' : 'bg-emerald-700 ' } rounded-sm p-2 ${currentQuestion && currentQuestion.type == "boolean" ?" text-zinc-900 font-bold" :' text-cyan-50 font-bold' }`}>
                <p className='mt-0 mb-3 relative border w-fit px-1 bg-transparent backdrop-blur-3xl text-xs '>{currentQuestion.difficulty ?? ''}</p>
                {currentQuestion.question} 
              
                </h1>

                <div className='mt-4'>
                  <div className='flex  w-fit flex-col items-center align-baseline space-y-5'>
                      {currentQuestion.options.map((option, index) => (
                          <p 
                            key={index}
                            className={`p-1 cursor-pointer rounded-md text-zinc-200 border-2 border-zinc-300 font-mono font-bold 
                              ${removedOptions.includes(option) ? 'line-through opacity-50' : ''} 
                              ${selectedAnswer === option && isCorrect ? 'bg-green-500' : ''} 
                              ${selectedAnswer === option && !isCorrect ? 'bg-red-500' : ''} 
                              ${option === currentQuestion.correct_answer && !isCorrect && selectedAnswer !== null ? 'bg-green-500' : ''}`}
                            onClick={() => handleAnswerClick(option)}
                          >
                            {option}
                          </p>
                      ))}
                  </div>
              </div>
              </div>

            </div>
            
          )}
        </div>
        </>
      ) : choice1 === 'finished' ? (
        <div className='flex flex-col justify-center items-center w-full h-screen bg-black text-emerald-400'>
          <div className='bg-zinc-800  border-4 border-zinc-900 absolute w-56 h-48 rounded-tl-full rounded-br-full'/>
          <div className='absolute w-20 animate-pulse h-20 bg-zinc-700 rounded-full'/>
          
          <h1 className='text-3xl relative mb-4'>Finished</h1>
          <p className='text-xl relative'>You scored <span className='text-cyan-500'>{score}</span> out of {questions.length}</p>
          <button className='mt-4 relative bg-emerald-600 text-white p-2 rounded' onClick={() => {
              dispatch(setChoice1('default'))
              dispatch(setScore(0))
              dispatch(setCurrentQuestionIndex(0))
              dispatch(setTimeLeft(30))
              setFreezCount(2)
              setRemoveOptsCount(1)
            }}>

            Play Again
          </button>
        </div>
      ) : (
        <div className='bg-black w-full h-screen text-white flex flex-col justify-center items-center font-mono'>

          <Image src="/QUZlogo.png" alt="" width={200} height={200} />
          <p className='text-sm font-mono text-emerald-400'> " Test Yourself " </p>


          <p className='md:text-2xl text-xl'>Welcome to Q<span className='font-bold font-serif text-red-600 '>U</span>Z</p>
          
          <div className='mt-4 flex flex-col items-center'>
            

            <label htmlFor="category">Choose a Category:</label>
            <select
                className="block w-full px-4 py-2 mt-4 text-white bg-black border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option className="text-gray-500 font-semibold" value="All">All</option>
                <option className="text-gray-400 font-semibold" value="movies">Movies</option>
                <option className="text-gray-500 font-semibold" value="games">Games</option>
                <option className="text-gray-500 font-semibold" value="computers">Computers/Tech</option>
                <option className="text-gray-500 font-semibold" value="music">Music</option>
                <option className="text-gray-500 font-semibold" value="Vehicles">Vehicles</option>
                <option className="text-gray-500 font-semibold" value="Programing">Programming</option>
                <option className="text-gray-400 font-semibold" value="JS">JavaScript-only</option>
                <option className="text-gray-400 font-semibold" value="PY">Python-only</option>
            </select>


            <button className='mb-4 mt-5 px-5 border-2' onClick={() => {
              dispatch(setChoice1('all'))
              dispatch(setScore(0)) 
              dispatch(setCurrentQuestionIndex(0)) 
              dispatch(setTimeLeft(30)) 
              setFreezCount(2)
              setRemoveOptsCount(1)
            }}>
              Start
            </button>

          </div>
        </div>
      )}
    </>
  )
}

export default HomePage