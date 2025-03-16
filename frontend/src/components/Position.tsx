import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { 
    getInterviewFlow, 
    getCandidates, 
    updateCandidateStage,
    getMockInterviewFlow,
    getMockCandidates 
} from '../services/api';

type InterviewStep = {
    id: number;
    name: string;
    orderIndex: number;
};

type Candidate = {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
};

type InterviewFlow = {
    positionName: string;
    interviewFlow: {
        id: number;
        description: string;
        interviewSteps: InterviewStep[];
    };
};

const Position: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [interviewFlow, setInterviewFlow] = useState<InterviewFlow | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [error, setError] = useState<string | null>(null);

    console.log('Position component rendering with id:', id); // Debug log
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            
            console.log('Fetching data for position:', id);
            
            try {
                const [flowData, candidatesData] = await Promise.all([
                    getInterviewFlow(id),
                    getCandidates(id)
                ]);
                
                console.log('Interview flow data:', flowData);
                console.log('Candidates data:', candidatesData);
                
                setInterviewFlow(flowData);
                setCandidates(candidatesData);
            } catch (err) {
                console.error('Error fetching data:', err);
                console.log('Falling back to mock data');
                
                // Use mock data as fallback
                setInterviewFlow(getMockInterviewFlow(id));
                setCandidates(getMockCandidates(id));
                
                // Clear error since we're using mock data
                setError(null);
            }
        };

        fetchData();
    }, [id]);

    const handleCandidateMove = async (candidateId: string, newStepId: string) => {
        if (!id) return;
        
        try {
            await updateCandidateStage(candidateId, newStepId);
            const updatedCandidates = await getCandidates(id);
            setCandidates(updatedCandidates);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update candidate stage');
        }
    };

    if (error) {
        return <div className="alert alert-danger m-4">{error}</div>;
    }

    if (!interviewFlow) {
        return <div className="d-flex justify-content-center m-4">Loading...</div>;
    }

    return (
        <Container fluid className="mt-4">
            <h2 className="mb-4">{interviewFlow.positionName}</h2>
            <Row>
                {interviewFlow.interviewFlow.interviewSteps.map((step) => (
                    <Col key={step.id} md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Header className="bg-primary text-white">
                                <h5 className="mb-0">{step.name}</h5>
                            </Card.Header>
                            <Card.Body>
                                {candidates
                                    .filter(candidate => candidate.currentInterviewStep === step.name)
                                    .map((candidate, index) => (
                                        <Card key={index} className="mb-2">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6 className="mb-0">{candidate.fullName}</h6>
                                                        <small className="text-muted">
                                                            Score: {candidate.averageScore}
                                                        </small>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Position; 