import { useEffect, useState } from 'react'

import MacWindow from './MacWindow'

import { getRepositories } from '../../api/github'

import profile from '../../data/profile'
import social from '../../data/social'
import skills from '../../data/skills'
import experience from '../../data/experience'

import './cli.scss'

import pkg from 'react-console-emulator'

const Terminal = pkg.Terminal || pkg.default || pkg

const Cli = ({
    windowName,
    closeWindow,
    activeWindow,
    focusWindow,
    windowMode,
    setWindowMode,
    desktopRef,
}) => {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
    let cancelled = false

    const loadProjects = async () => {
        try {
            const data = await getRepositories()

            if (cancelled) return

            setRepositories(data)
        } catch (error) {
            if (cancelled) return

            console.error(
                'Failed to load GitHub projects:',
                error
            )
        }
    }

    loadProjects()

    return () => {
        cancelled = true
    }
}, [])

    const availableCommands = `Available commands:

help        Show all available commands
about       About this portfolio
projects    View GitHub projects
skills      Show tech stack and skills
experience  Work experience overview
contact     Contact details and social links
resume      Portfolio resume info`

    const formatProjects = () => {
        if (repositories.length === 0) {
            return 'No GitHub projects available.'
        }

        return [
            'GitHub projects:',
            '',
            ...repositories.map(
                (repository, index) =>
                    `${index + 1}. ${repository.name}`
            ),
        ].join('\n')
    }

    const formatSkills = () => {
        const sections = Object.entries(skills)

        return sections
            .map(([category, skillList]) => {
                const title =
                    category.charAt(0).toUpperCase() +
                    category.slice(1)

                return `${title}:\n- ${skillList.join(
                    '\n- '
                )}`
            })
            .join('\n\n')
    }

    const formatExperience = () => {
        if (!experience.length) {
            return 'No professional experience has been added yet.'
        }

        return experience
            .map((item) => {
                if (typeof item === 'string') {
                    return `- ${item}`
                }

                return `- ${
                    item.title ||
                    item.role ||
                    'Experience'
                }`
            })
            .join('\n')
    }

    const formatContact = () => {
        const contactLines = []

        if (social.email?.address) {
            contactLines.push(
                `Email: ${social.email.address}`
            )
        }

        if (social.linkedin?.url) {
            contactLines.push(
                `LinkedIn: ${social.linkedin.url}`
            )
        }

        if (social.github?.url) {
            contactLines.push(
                `GitHub: ${social.github.url}`
            )
        }

        if (social.instagram?.url) {
            contactLines.push(
                `Instagram: ${social.instagram.url}`
            )
        }

        return contactLines.length
            ? contactLines.join('\n')
            : 'No contact information available.'
    }

    const formatResume = () => {
        if (profile.resume) {
            return `Resume: ${profile.resume}`
        }

        return 'Resume is available at the portfolio root.'
    }

    return (
        <MacWindow
            windowName={windowName}
            closeWindow={closeWindow}
            activeWindow={activeWindow}
            focusWindow={focusWindow}
            windowMode={windowMode}
            setWindowMode={setWindowMode}
            desktopRef={desktopRef}
        >
            <div className="cli-window">
                <Terminal
                    noDefaults
                    commands={{
                        help: {
                            description:
                                'List all available commands.',
                            usage: 'help',
                            fn: () => availableCommands,
                        },

                        about: {
                            description:
                                'Learn more about this portfolio.',
                            usage: 'about',
                            fn: () =>
                                `Hi, I am ${profile.name} — ${profile.bio}`,
                        },

                        projects: {
                            description:
                                'Show GitHub projects.',
                            usage: 'projects',
                            fn: formatProjects,
                        },

                        skills: {
                            description:
                                'Show technologies and skills.',
                            usage: 'skills',
                            fn: formatSkills,
                        },

                        experience: {
                            description:
                                'View experience overview.',
                            usage: 'experience',
                            fn: formatExperience,
                        },

                        contact: {
                            description:
                                'Display contact information.',
                            usage: 'contact',
                            fn: formatContact,
                        },

                        resume: {
                            description:
                                'Show resume information.',
                            usage: 'resume',
                            fn: formatResume,
                        },
                    }}
                    welcomeMessage={`Welcome to ${profile.name}'s portfolio terminal!

Type "help" to see all available commands.`}
                    promptLabel="sohamKule@portfolio:~$"
                    promptLabelStyle={{
                        color: '#00ff00',
                    }}
                />
            </div>
        </MacWindow>
    )
}

export default Cli