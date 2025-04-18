import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experienceLevel and summary. Provide a list for Fresher, Mid-Level, and Experienced.";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (summary) {
      setResumeInfo({
        ...resumeInfo,
        summary: summary
      });
    }
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
    console.log('Prompt:', PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const textResponse = await result.response.text();
      console.log('Raw AI Response:', textResponse);

      const parsedData = JSON.parse(textResponse);
      console.log('Parsed JSON:', parsedData);

      if (Array.isArray(parsedData)) {
        setAiGeneratedSummaryList(parsedData);
      } else {
        console.warn("Parsed AI response is not an array.");
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }

    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summary
      }
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
      console.log(resp);
      enabledNext(true);
      setLoading(false);
    }).catch((error) => {
      console.error("Error updating resume summary:", error);
      setLoading(false);
    });
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button
              variant='outline'
              onClick={GenerateSummaryFromAI}
              type='button'
              size='sm'
              className="border-primary text-primary flex gap-2"
            >
              <Brain className='h-4 w-4' /> Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
          />

          <div className='mt-2 flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && aiGeneratedSummaryList.length > 0 && (
        <div className='mt-6'>
          <h2 className='font-bold text-lg mb-2'>Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index} className='mb-4 p-3 border rounded shadow'>
              <h3 className='font-semibold'>Level: {item.experienceLevel}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
