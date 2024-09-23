'use client'

import React, { useEffect, useState,useMemo,useCallback } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import Image from 'next/image'
import { 
  setChoice1,
  setQuestions,
  setCurrentQuestionIndex,
  setScore,
  setTimeLeft,
  setIsFrozen,
 } from '../store/quizSlice'

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

  // Memoize the questions array----------------------
  const memoizedQuestions = useMemo(() => questions, [questions])

  // Memoize the shuffleArray function--------------------
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled;
  }, []);

  // Memoize the getNextQuestion function
  const getNextQuestion = useCallback((index) => {
    const question = memoizedQuestions[index]
    if (!question) return null
    const options = shuffleArray([...question.incorrect_answers, question.correct_answer])
    return { ...question, options }
  }, [memoizedQuestions, shuffleArray])


  // Memoize the current question-----------------------
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
  

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(api)
      const decodedQuestions = response.data.results.map(q => ({
        ...q,
        question: decodeHTMLEntities(q.question),
        correct_answer: decodeHTMLEntities(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHTMLEntities)
      }))
      setLoading(false)
      dispatch(setQuestions(decodedQuestions));
    } catch (error) {
      console.error('Error fetching questions:', error)
      toast.error('Connection Time Out!!!')
      setLoading(true)
    }
  }

  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
  }

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      dispatch(setScore(score + 1));
    }
    moveToNextQuestion()
  }

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
    return<><Toaster
    position="top-center"
    reverseOrder={false}
  />
    <div className='bg-black flex justify-center items-center font-mono text-lg font-bold w-full h-screen text-white '>
      
      
      <p className='animate-pulse'>loading....</p>
      </div>
      </>
    
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
        <div className={`flex justify-center items-center w-full h-screen bg-black text-white`}>
          <button className='mb-5 absolute top-2 left-2' onClick={() => dispatch(setChoice1('default'))}>
            Quit
          </button>
          <div className='mb-4 flex absolute top-11 left-2'>
            <p onClick={()=>setTheme('amber')} className='mr-4 bg-amber-500 w-5 h-5'/>
            <p onClick={()=>setTheme('red')} className='mr-4 w-5 h-5 bg-red-600'/>
            <p onClick={()=>setTheme('violet')} className='mr-4 w-5 h-5 bg-violet-600'/>
            <p onClick={()=>setTheme('default')} className='bg-emerald-500 w-5 h-5'/>
          </div>
          <div className='absolute text-center top-1'>
            <p className='text-xs'>{selectedCategory}</p>
            <p className='mt-4 '>Score: <span className={`${score>10 ? 'text-blue-600' : score>20 ? 'text-green-600' : ''}`}>{score}</span></p>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className={`${isFrozen ? 'text-emerald-300 font-extrabold font-mono' : ''} text-xl mb-2 ${timeLeft<10 ? 'animate-ping text-red-600' : '' }  mt-5`}>{timeLeft}</p>
          </div>
          {/* {mysteryBoxAvailable && (
              <button onClick={handleMysteryBox}>Open Mystery Box</button>
            )} */}



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
              <span className='font-mono text-xs'>Freeze</span>
              <Image src="/freeze.png" alt="freeze" width={45} height={45}/>
              <span className='text-xs'>({freezCount})</span>
            </button>


            {/* <p></p> */}
          </div>
                
          {currentQuestion && (
            <div className='relative flex justify-center items-center md:w-[720px] md:h-[500px] w-72 h-64 '>
             
             
              <div className={` flex flex-col items-center justify-center `}>
                <h1 className={`${timeLeft < 7 ? ' ' : ' '} relative -top-10 break-all text-center ${theme == 'amber' ? 'bg-amber-500' : theme == 'violet' ? 'bg-violet-600' : theme == 'red' ? 'bg-red-600' : 'bg-emerald-700 ' } rounded-md p-2 ${currentQuestion && currentQuestion.type == "boolean" ?" text-zinc-900 font-bold" :' text-cyan-200 font-bold' }`}
                 
                 >
                  {currentQuestion.question}
                </h1>
                <div className='mt-4'>
                  <div className='flex w-fit flex-col  items-center align-baseline space-y-5'>
                    {/* <p className='p-1  cursor-pointer bg-slate-200 rounded-md text-zinc-900 font-mono font-bold' onClick={() => handleAnswerClick(currentQuestion.options[0])}>{currentQuestion.options[0]}</p> */}
                    {/* <p className='p-1  cursor-pointer bg-slate-200 rounded-md text-zinc-900 font-mono font-bold' onClick={() => handleAnswerClick(currentQuestion.options[1])}>{currentQuestion.options[1]}</p> */}
                    
                    <p className={`p-1 cursor-pointer bg-slate-200 rounded-md text-zinc-900 font-mono font-bold ${removedOptions.includes(currentQuestion.options[0]) ? 'line-through opacity-50' : ''}`} onClick={() => handleAnswerClick(currentQuestion.options[0])}>
                      {currentQuestion.options[0]}
                    </p>
                    <p className={`p-1 cursor-pointer bg-slate-200 rounded-md text-zinc-900 font-mono font-bold ${removedOptions.includes(currentQuestion.options[1]) ? 'line-through opacity-50' : ''}`} onClick={() => handleAnswerClick(currentQuestion.options[1])}>
                      {currentQuestion.options[1]}
                    </p>

                  
                    <p className={`${currentQuestion && currentQuestion.type == "boolean" ?" " :' p-1' } cursor-pointer bg-slate-200 rounded-md text-zinc-900 font-mono font-bold  ${removedOptions.includes(currentQuestion.options[2]) ? 'line-through opacity-50' : ''}`} onClick={() => handleAnswerClick(currentQuestion.options[2])}>{currentQuestion.options[2]}</p>
                    <p className={`${currentQuestion && currentQuestion.type == "boolean" ?" " :' p-1' } cursor-pointer bg-slate-200 rounded-md text-zinc-900 font-mono font-bold  ${removedOptions.includes(currentQuestion.options[3]) ? 'line-through opacity-50' : ''}`} onClick={() => handleAnswerClick(currentQuestion.options[3])}>{currentQuestion.options[3]}</p>
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
      ) : choice1 === 'finished' ? (
        <div className='flex flex-col justify-center items-center w-full h-screen bg-black text-cyan-300'>
          <h1 className='text-3xl mb-4'>Finished</h1>
          <p className='text-xl'>You scored {score} out of {questions.length}</p>
          <button className='mt-4 bg-blue-500 text-white p-2 rounded' onClick={() => {
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

          <p className='md:text-2xl text-xl'>Welcome to Q<span className='font-bold font-serif text-red-600 '>U</span>Z</p>
          {/* <p className='mt-4'>Select Your Preference</p> */}
          <div className='mt-4 flex flex-col '>
            {/* <button className='mb-4' onClick={() => setChoice1('selected')}>
              Programing / Coding
            </button> */}

            <label htmlFor="category">Choose a category:</label>
            <select
                className='text-white font-bold bg-transparent mt-4'
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
              <option className='text-black font-bold' value="All">All</option>
              <option className='text-black font-bold' value="movies">Movies</option>
              <option className='text-black font-bold' value="games">Games</option>
              <option className='text-black font-bold' value="computers">Computers/Tech</option>
              <option className='text-black font-bold' value="music">Music</option>
              <option className='text-black font-bold' value="Vehicles">Vehicles</option>
            </select>




            <button className='mb-4 mt-5 border-2' onClick={() => {
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