import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([formField]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const RemoveExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    value={item.title}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    value={item.companyName}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    value={item.city}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    value={item.state}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Work Summary</label>
                  <RichTextEditor
                    index={index}
                    value={item.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExperience}
            >
              + Add more Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveExperience}
            >
              - Remove
            </Button>
          </div>

          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
