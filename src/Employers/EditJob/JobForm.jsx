/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from 'react-toastify';
import { BasicInfo1 } from './BasicInfo1';
import { BasicInfo2 } from './BasicInfo2';
import api from '../../utils/AxiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

const initial = {
  min_pay_range: '', max_pay_range: '', resume_submit: '',
  deadline: '', title: '', organization_name: '', location: '',
  summary: '', requirements: '', job_type: '', open_status: ''
};

export const JobForm = () => {
  // params hook
  const { id } = useParams();

  // states
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initial);

  // effects
  useEffect(() => { fetchData(); }, [id]);

  // methods
  const fetchData = async () => {
    // 
    // /employer/jobs/${id}/
    try {
      const res = await api.get(`/admin/jobs-review/${id}/`);
      setFormData(() => res.data || initial);
      // console.log(res.data)
      // console.log(formData)
    }
    catch (err) {
      console.error(err);
      toast.error('Job ' + err?.response?.data?.detail || 'There was an error fetching data');
    };
  };


  // objects and methods
  const steps = { 1: BasicInfo1, 2: BasicInfo2 };
  const nextStep = () => setStep(prev => ++prev);
  const prevStep = () => setStep(prev => --prev);

  // memo
  const InfoTab = useMemo(() => steps[step] || steps[1], [step, steps]);

  return <section>
    <InfoTab setStep={setStep} formData={formData} setFormData={setFormData} prevStep={prevStep} nextStep={nextStep} step={step} id={id} />
  </section>;
};
